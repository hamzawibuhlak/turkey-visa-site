// صفحة عرض الرحلة المشتركة (ح١٠). الخطة تأتي في جزء الرابط بعد #، فلا تصل إلى أي خادم ولا تُخزَّن.
// الرابط يأتي من أي شخص، فكل قيمة تُفحص، والعرض بـ textContent وحده.
(function () {
  'use strict';
  var LOCALE = 'ar-SA-u-ca-gregory-nu-latn';
  var MAX_TEXT = 200;
  var MAX_DAYS = 62;
  var MAX_STAGES = 40;
  var DAY = /^\d{4}-\d{2}-\d{2}$/;
  var TIME = /^\d{2}:\d{2}$/;

  var text = function (value) {
    return typeof value === 'string' ? value.trim().slice(0, MAX_TEXT) : '';
  };
  var day = function (value) {
    return typeof value === 'string' && DAY.test(value) ? value : '';
  };
  var coord = function (value, limit) {
    return typeof value === 'number' && Math.abs(value) <= limit ? value : null;
  };

  async function inflate(bytes) {
    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  async function decode(hash) {
    var kind = hash.charAt(0);
    var binary = atob(hash.slice(1).replace(/-/g, '+').replace(/_/g, '/'));
    var bytes = Uint8Array.from(binary, function (c) {
      return c.charCodeAt(0);
    });
    if (kind === 'z') bytes = await inflate(bytes);
    else if (kind !== 'j') throw new Error('unknown format');
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  function clean(raw) {
    if (!raw || raw.v !== 1 || !Array.isArray(raw.d)) throw new Error('unknown version');
    return {
      name: text(raw.n) || 'رحلة',
      from: day(raw.f),
      to: day(raw.t),
      hotel: text(raw.h),
      days: raw.d.slice(0, MAX_DAYS).map(function (row) {
        var stages = Array.isArray(row) && Array.isArray(row[1]) ? row[1] : [];
        return {
          date: day(row && row[0]),
          stages: stages.slice(0, MAX_STAGES).map(function (s) {
            return {
              time: typeof s[0] === 'string' && TIME.test(s[0]) ? s[0] : '',
              name: text(s[1]) || 'مرحلة',
              minutes: Number.isInteger(s[2]) && s[2] > 0 ? s[2] : 0,
              note: text(s[3]),
              lat: coord(s[4], 90),
              lng: coord(s[5], 180),
            };
          }),
        };
      }),
    };
  }

  function el(tag, className, content) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  }

  function dateText(value, options) {
    return new Intl.DateTimeFormat(LOCALE, options).format(new Date(value + 'T12:00:00'));
  }

  function minutesText(n) {
    if (n === 1) return 'دقيقة';
    if (n === 2) return 'دقيقتان';
    return n + (n % 100 >= 3 && n % 100 <= 10 ? ' دقائق' : ' دقيقة');
  }

  function stageItem(stage) {
    var item = el('li', 'trip-stage');
    var time = el('time', '', stage.time || '—');
    var body = el('div');
    body.append(el('strong', '', stage.name));
    if (stage.minutes) body.append(el('small', '', minutesText(stage.minutes)));
    if (stage.note) body.append(el('small', '', stage.note));
    if (stage.lat !== null && stage.lng !== null) {
      var link = el('a', '', 'افتح في الخرائط');
      link.href = 'https://www.google.com/maps/search/?api=1&query=' + stage.lat + ',' + stage.lng;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      body.append(link);
    }
    item.append(time, body);
    return item;
  }

  function daySection(entry, index) {
    var section = el('section', 'trip-day');
    var title = entry.date
      ? 'اليوم ' + (index + 1) + ' · ' + dateText(entry.date, { weekday: 'long', day: 'numeric', month: 'long' })
      : 'اليوم ' + (index + 1);
    section.append(el('h2', '', title));
    if (!entry.stages.length) {
      section.append(el('p', 'trip-empty', 'يوم مفتوح'));
      return section;
    }
    var list = el('ol');
    entry.stages.forEach(function (stage) {
      list.append(stageItem(stage));
    });
    section.append(list);
    return section;
  }

  function show(root, trip) {
    document.title = trip.name + ' | وين السفرة؟';
    var head = el('section', 'trip-head');
    head.append(el('h1', '', trip.name));
    if (trip.from && trip.to) {
      var options = { day: 'numeric', month: 'long', year: 'numeric' };
      head.append(el('p', '', 'من ' + dateText(trip.from, options) + ' إلى ' + dateText(trip.to, options)));
    }
    if (trip.hotel) head.append(el('p', '', 'الفندق: ' + trip.hotel));
    root.replaceChildren(head);
    trip.days.forEach(function (entry, index) {
      root.append(daySection(entry, index));
    });
    root.append(el('p', 'trip-note', 'نسخة للقراءة من الخطة وقت مشاركتها، ولا تتغيّر مع تعديلات صاحبها.'));
  }

  function fail(root, title, detail) {
    var head = el('section', 'trip-head');
    head.append(el('h1', '', title), el('p', '', detail));
    root.replaceChildren(head);
  }

  var root = document.getElementById('trip');
  var hash = location.hash.slice(1);
  if (!hash) {
    fail(root, 'لا توجد خطة في هذا الرابط', 'اطلب من صاحب الرحلة مشاركة رابطها من جديد.');
    return;
  }
  decode(hash)
    .then(clean)
    .then(function (trip) {
      show(root, trip);
    })
    .catch(function () {
      fail(root, 'تعذّر فتح هذه الخطة', 'قد يكون الرابط ناقصًا؛ اطلب من صاحب الرحلة رابطًا جديدًا.');
    });
})();
