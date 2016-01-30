var _isDown, _points, _r, _g, _rc, _lastX, _lastY,
    canvas, stats, socket,
    gesturesDark = [
      'inverted pentagram'
    ],
    gesturesLight = [
      'pentagram'
    ],
    gesturesDarkPatterns = [
      {name: 'inverted pentagram', points: new Array(new Point(150,85),new Point(151,93),new Point(151,94),new Point(152,96),new Point(152,97),new Point(154,100),new Point(154.25112815762853,100.50225631525703),new Point(155,102),new Point(155,104),new Point(156,105),new Point(156,106),new Point(157,107),new Point(157,109),new Point(158,110),new Point(158,111),new Point(159,112),new Point(159,114),new Point(159.8018831578807,114.8018831578807),new Point(160,115),new Point(160,116),new Point(160,117),new Point(161,118),new Point(162,120),new Point(162,121),new Point(162,122),new Point(163,123),new Point(163,124),new Point(163,125),new Point(164,126),new Point(164,127),new Point(165,128),new Point(165,129),new Point(165,129.29231488073216),new Point(165,130),new Point(166,131),new Point(166,132),new Point(167,133),new Point(167,134),new Point(167,135),new Point(168,136),new Point(168,137),new Point(168,138),new Point(169,139),new Point(169,140),new Point(169,141),new Point(170,142),new Point(170,143),new Point(170,143.68666370165067),new Point(170,144),new Point(171,145),new Point(171,146),new Point(171,147),new Point(172,148),new Point(172,149),new Point(172,150),new Point(173,152),new Point(173,153),new Point(174,154),new Point(174,155),new Point(174,156),new Point(175,157),new Point(175,158),new Point(175.18325245517204,158.18325245517204),new Point(176,159),new Point(176,160),new Point(176,161),new Point(176,162),new Point(177,163),new Point(177,164),new Point(177,165),new Point(177,166),new Point(178,167),new Point(178,168),new Point(178,169),new Point(179,170),new Point(179,171),new Point(179,172),new Point(179,173),new Point(179.04788561822332,173.04788561822332),new Point(180,174),new Point(180,175),new Point(180,176),new Point(180,177),new Point(181,178),new Point(181,180),new Point(182,181),new Point(182,183),new Point(183,183),new Point(183,184),new Point(183,185),new Point(184,186),new Point(184,186.87628287402563),new Point(184,187),new Point(184,188),new Point(185,189),new Point(185,191),new Point(186,192),new Point(186,193),new Point(186,194),new Point(187,195),new Point(187,196),new Point(188,197),new Point(188,198),new Point(189,200),new Point(189,201),new Point(189,201.44877727981745),new Point(189,202),new Point(190,203),new Point(190,204),new Point(191,205),new Point(191,207),new Point(192,208),new Point(192,209),new Point(193,211),new Point(194,213),new Point(194,214),new Point(194.98360930553721,215.96721861107443),new Point(195,216),new Point(195,218),new Point(196,220),new Point(196,221),new Point(197,223),new Point(197,224),new Point(197,225),new Point(198,226),new Point(198,227),new Point(199,228),new Point(199,230),new Point(199,231),new Point(199.09065310178886,231.09065310178886),new Point(200,232),new Point(200,233),new Point(200,235),new Point(201,236),new Point(201,237),new Point(201,239),new Point(201,240),new Point(202,241),new Point(202,242),new Point(202,243),new Point(202,244),new Point(202,245),new Point(202.95528626484014,245.95528626484014),new Point(203,246),new Point(203,247),new Point(203,248),new Point(203,249),new Point(203,251),new Point(203,252),new Point(204,253),new Point(204,255),new Point(204,256),new Point(204,257),new Point(204,258),new Point(204,259),new Point(205,261),new Point(205,261.75190032222366),new Point(205,262),new Point(205,263),new Point(205,264),new Point(205,265),new Point(205,266),new Point(206,266),new Point(206,267),new Point(206,268),new Point(206,269),new Point(207,269),new Point(207,268),new Point(207,267),new Point(207,266),new Point(208,265),new Point(208,264),new Point(208,263),new Point(208.3591587557783,262.2816824884434),new Point(209,261),new Point(209,259),new Point(210,257),new Point(210,255),new Point(211,253),new Point(211,251),new Point(212,249),new Point(212,247),new Point(212.14500816553078,246.70998366893843),new Point(213,245),new Point(213,243),new Point(214,241),new Point(214,239),new Point(215,237),new Point(216,235),new Point(216,233),new Point(217,232),new Point(217,231.56882072416892),new Point(217,230),new Point(218,229),new Point(218,227),new Point(219,226),new Point(219,225),new Point(220,223),new Point(221,222),new Point(221,220),new Point(222,218),new Point(222,216.8181807335038),new Point(222,216),new Point(223,214),new Point(224,212),new Point(224,210),new Point(225,208),new Point(225,206),new Point(226,205),new Point(227,203),new Point(227,201.71124957309206),new Point(227,201),new Point(228,199),new Point(228,198),new Point(229,196),new Point(230,195),new Point(230,194),new Point(231,192),new Point(231,191),new Point(232,190),new Point(233,189),new Point(233,188),new Point(233.5680347448551,187.4319652551449),new Point(234,187),new Point(235,186),new Point(235,185),new Point(236,184),new Point(236,183),new Point(237,182),new Point(237,181),new Point(238,180),new Point(238,179),new Point(239,178),new Point(239,177),new Point(240,176),new Point(240,175),new Point(240.61234459328762,173.7753108134248),new Point(241,173),new Point(242,172),new Point(242,170),new Point(243,169),new Point(244,168),new Point(244,166),new Point(245,164),new Point(245,163),new Point(246,161),new Point(247,160),new Point(247,159.53039741296223),new Point(247,158),new Point(247,156),new Point(248,155),new Point(248,153),new Point(249,151),new Point(249,150),new Point(250,148),new Point(250,146),new Point(251,145),new Point(251,144.36554385992403),new Point(251,143),new Point(251,142),new Point(252,141),new Point(252,139),new Point(253,137),new Point(253,136),new Point(254,134),new Point(255,133),new Point(255,131),new Point(256,130),new Point(256.17222022524186,129.6555595495163),new Point(257,128),new Point(257,127),new Point(258,125),new Point(259,124),new Point(259,122),new Point(260,120),new Point(261,119),new Point(261,117),new Point(262,115),new Point(262,114.92218627122028),new Point(262,113),new Point(263,112),new Point(263,110),new Point(263,108),new Point(264,106),new Point(264,103),new Point(265,101),new Point(265,99.34311915580898),new Point(265,98),new Point(266,96),new Point(267,94),new Point(267,92),new Point(268,90),new Point(268,88),new Point(268,87),new Point(268,86),new Point(269,85),new Point(269,84.00012001789747),new Point(269,84),new Point(269,83),new Point(269,82),new Point(269,81),new Point(270,81),new Point(270,80),new Point(270,79),new Point(269,80),new Point(269,81),new Point(268,81),new Point(267,82),new Point(266,84),new Point(264,85),new Point(263.1764090190266,85.82359098097339),new Point(263,86),new Point(262,88),new Point(260,89),new Point(259,91),new Point(258,92),new Point(257,94),new Point(255,95),new Point(254,96),new Point(254,97),new Point(253.1464021945308,97.8535978054692),new Point(253,98),new Point(252,99),new Point(251,100),new Point(250,101),new Point(248,102),new Point(247,103),new Point(246,104),new Point(245,105),new Point(243,107),new Point(242,108),new Point(241,108),new Point(240.7918400496982,108.20815995030179),new Point(240,109),new Point(239,110),new Point(238,111),new Point(237,111),new Point(236,112),new Point(235,113),new Point(234,114),new Point(233,115),new Point(231,116),new Point(230,117),new Point(228.02329553180203,117.98835223409898),new Point(228,118),new Point(227,120),new Point(226,121),new Point(224,122),new Point(223,123),new Point(222,124),new Point(220,125),new Point(219,126),new Point(218,127),new Point(216,128),new Point(215.70016429918329,128.29983570081671),new Point(215,129),new Point(213,130),new Point(212,131),new Point(210,133),new Point(208,134),new Point(207,135),new Point(205,136),new Point(204,137),new Point(202.4830845415344,137.7584577292328),new Point(202,138),new Point(200,139),new Point(198,140),new Point(196,141),new Point(194,142),new Point(192,142),new Point(190,143),new Point(188,144),new Point(187.54482257602996,144.22758871198502),new Point(186,145),new Point(184,146),new Point(182,147),new Point(180,148),new Point(179,149),new Point(178,150),new Point(176,151),new Point(175,152),new Point(173.61243942072775,152.69378028963612),new Point(173,153),new Point(172,154),new Point(170,155),new Point(168,156),new Point(167,157),new Point(165,158),new Point(163,159),new Point(162,160),new Point(160,161),new Point(159.7470622689111,161.2529377310889),new Point(159,162),new Point(157,163),new Point(156,164),new Point(154,165),new Point(153,166),new Point(151,167),new Point(150,169),new Point(149,170),new Point(147.0125841741907,170.99370791290465),new Point(147,171),new Point(146,172),new Point(144,173),new Point(143,173),new Point(142,174),new Point(141,175),new Point(140,176),new Point(138,177),new Point(137,177),new Point(136,178),new Point(135,179),new Point(134,180),new Point(133.9202837932928,180),new Point(133,180),new Point(132,181),new Point(131,182),new Point(130,183),new Point(129,183),new Point(128,184),new Point(127,185),new Point(126,186),new Point(125,186),new Point(124,187),new Point(124,188),new Point(123,189),new Point(122.12925149830976,189.87074850169026),new Point(122,190),new Point(122,191),new Point(121,191),new Point(121,192),new Point(121,193),new Point(120,194),new Point(120,195),new Point(119,195),new Point(119,196),new Point(118,196),new Point(117,197),new Point(116,197),new Point(117,197),new Point(118,197),new Point(120,197),new Point(120.4542002861711,197),new Point(122,197),new Point(123,197),new Point(125,197),new Point(127,197),new Point(129,197),new Point(131,196),new Point(132,196),new Point(134,196),new Point(136,196),new Point(136.68354894145529,196),new Point(137,196),new Point(139,196),new Point(141,196),new Point(143,196),new Point(144,197),new Point(146,197),new Point(147,197),new Point(149,197),new Point(150,197),new Point(152,198),new Point(152.49868403436636,198),new Point(153,198),new Point(154,198),new Point(155,198),new Point(156,198),new Point(157,198),new Point(159,199),new Point(160,199),new Point(161,199),new Point(162,199),new Point(164,199),new Point(165,199),new Point(166,200),new Point(168,200),new Point(168.31381912727744,200),new Point(169,200),new Point(170,200),new Point(172,200),new Point(173,201),new Point(175,201),new Point(176,201),new Point(178,202),new Point(180,202),new Point(181,202),new Point(183,203),new Point(183.89288624268875,203),new Point(184,203),new Point(186,203),new Point(188,204),new Point(189,204),new Point(191,204),new Point(192,204),new Point(194,205),new Point(195,205),new Point(197,205),new Point(199,205),new Point(199.88616692047313,205),new Point(200,205),new Point(202,205),new Point(204,205),new Point(205,205),new Point(207,205),new Point(208,206),new Point(210,206),new Point(212,206),new Point(213,206),new Point(215,206),new Point(215.937369990884,206),new Point(217,206),new Point(219,206),new Point(220,206),new Point(222,206),new Point(224,206),new Point(225,206),new Point(227,206),new Point(228,206),new Point(230,206),new Point(231,206),new Point(232.25469049937962,206.6273452496898),new Point(233,207),new Point(234,207),new Point(235,207),new Point(237,207),new Point(238,207),new Point(239,207),new Point(241,207),new Point(242,208),new Point(243,208),new Point(245,208),new Point(246,208),new Point(248,208),new Point(248.15409392356088,208.15409392356088),new Point(249,209),new Point(250,209),new Point(252,209),new Point(253,209),new Point(254,209),new Point(255,209),new Point(257,209),new Point(258,209),new Point(259,209),new Point(261,210),new Point(262,210),new Point(263,210),new Point(264.0330568094902,210),new Point(265,210),new Point(266,210),new Point(268,210),new Point(269,210),new Point(271,210),new Point(272,210),new Point(274,210),new Point(275,210),new Point(277,210),new Point(278,210),new Point(280,210),new Point(280.49847344227413,210),new Point(281,210),new Point(283,210),new Point(284,210),new Point(286,210),new Point(287,210),new Point(288,210),new Point(290,210),new Point(291,210),new Point(292,210),new Point(293,210),new Point(294,210),new Point(295,210),new Point(296,210),new Point(296,209.03610992494188),new Point(296,209),new Point(297,209),new Point(298,209),new Point(299,209),new Point(300,209),new Point(301,209),new Point(302,209),new Point(303,209),new Point(304,209),new Point(305,209),new Point(306,209),new Point(307,209),new Point(308,209),new Point(307,208),new Point(305,207),new Point(304.2209748320308,207),new Point(304,207),new Point(303,206),new Point(301,204),new Point(299,203),new Point(298,202),new Point(296,200),new Point(295,199),new Point(293,198),new Point(292,197),new Point(291.67572270626556,196.6757227062656),new Point(290,195),new Point(289,194),new Point(287,193),new Point(286,191),new Point(285,190),new Point(283,188),new Point(282,187),new Point(281,185),new Point(280.7170791642967,184.85853958214835),new Point(279,184),new Point(278,182),new Point(277,180),new Point(276,179),new Point(274,178),new Point(273,176),new Point(272,175),new Point(270.0392178347325,173.03921783473245),new Point(270,173),new Point(269,172),new Point(267,170),new Point(265,168),new Point(263,167),new Point(261,165),new Point(259,163),new Point(257.7066903021638,162.3533451510819),new Point(257,162),new Point(255,160),new Point(253,158),new Point(251,157),new Point(249,156),new Point(247,154),new Point(245,153),new Point(244.54289825200107,152.84763275066703),new Point(242,152),new Point(240,151),new Point(238,150),new Point(236,149),new Point(234,148),new Point(232,147),new Point(231,146),new Point(229.93526218037292,145.46763109018647),new Point(229,145),new Point(227,144),new Point(226,143),new Point(224,142),new Point(223,141),new Point(222,139),new Point(220,139),new Point(219,137),new Point(218,136),new Point(217.76715087038374,136),new Point(217,136),new Point(216,134),new Point(215,133),new Point(213,132),new Point(212,131),new Point(211,130),new Point(209,129),new Point(208,128),new Point(206,127),new Point(205.22420514687494,126.22420514687495),new Point(205,126),new Point(203,125),new Point(202,124),new Point(201,123),new Point(199,122),new Point(198,121),new Point(196,120),new Point(195,120),new Point(193,119),new Point(191.24564360660068,118.12282180330034),new Point(191,118),new Point(190,117),new Point(189,116),new Point(187,116),new Point(185,115),new Point(184,114),new Point(182,113),new Point(180,112),new Point(179,112),new Point(177,111),new Point(176.99726623017222,110.99726623017222),new Point(176,110),new Point(175,109),new Point(173,109),new Point(172,108),new Point(171,108),new Point(170,107),new Point(169,106),new Point(168,105),new Point(167,105),new Point(165,104),new Point(164,103),new Point(163.70151188926508,102.85075594463254),new Point(162,102),new Point(161,101),new Point(160,100),new Point(158,99),new Point(157,98),new Point(156,97),new Point(155,96),new Point(154,95),new Point(153,94),new Point(152,93),new Point(151.28349433296432,92.28349433296434),new Point(151,92),new Point(150,91),new Point(149,90),new Point(149,89),new Point(148,89),new Point(148,88),new Point(147,88),new Point(147,87),new Point(146,87),new Point(146,89),new Point(146,90),new Point(146,92),new Point(145,94))}
    ],
    gesturesLightPatterns = [
      {name: 'pentagram', points: new Array(new Point(252,140),new Point(252,141),new Point(251,141),new Point(251,142),new Point(251,142),new Point(251,143),new Point(250,143),new Point(250,143),new Point(250,144),new Point(250,144),new Point(249,145),new Point(249,146),new Point(249,146),new Point(248,148),new Point(248,149),new Point(247,150),new Point(247,151),new Point(246,153),new Point(246,153.4364218660123),new Point(246,154),new Point(246,155),new Point(245,156),new Point(245,157),new Point(244,158),new Point(244,159),new Point(243,161),new Point(243,162),new Point(242,163),new Point(242,164),new Point(241,165),new Point(241,167),new Point(240.0945606668985,167.9054393331015),new Point(240,168),new Point(240,169),new Point(239,170),new Point(239,171),new Point(238,172),new Point(238,173),new Point(237,174),new Point(237,175),new Point(237,176),new Point(236,178),new Point(236,178),new Point(235,179),new Point(235,180),new Point(235,181),new Point(234,182),new Point(234,182.2961201787979),new Point(234,183),new Point(233,184),new Point(233,185),new Point(233,187),new Point(232,188),new Point(232,189),new Point(231,190),new Point(231,192),new Point(230,192),new Point(230,194),new Point(229,195),new Point(229,196),new Point(228.73395045481516,196.26604954518484),new Point(228,197),new Point(228,198),new Point(228,199),new Point(227,200),new Point(227,201),new Point(227,202),new Point(227,203),new Point(226,204),new Point(226,204),new Point(226,205),new Point(226,206),new Point(225,207),new Point(225,207),new Point(225,208),new Point(225,209),new Point(225,210),new Point(224,211),new Point(224,211.0421680089562),new Point(224,212),new Point(224,212),new Point(224,213),new Point(224,214),new Point(223,214),new Point(223,215),new Point(223,216),new Point(223,217),new Point(223,217),new Point(223,218),new Point(222,218),new Point(222,219),new Point(222,220),new Point(222,221),new Point(222,222),new Point(222,223),new Point(221,223),new Point(221,224),new Point(221,224.77915295471428),new Point(221,225),new Point(221,226),new Point(221,228),new Point(220,229),new Point(220,230),new Point(220,231),new Point(220,232),new Point(219,233),new Point(219,234),new Point(219,235),new Point(219,235),new Point(218,236),new Point(218,237),new Point(217,238),new Point(217,239),new Point(217,239.85928365097996),new Point(217,240),new Point(216,242),new Point(216,243),new Point(215,244),new Point(215,245),new Point(215,246),new Point(215,247),new Point(214,249),new Point(214,250),new Point(214,251),new Point(213,252),new Point(213,253),new Point(212,255),new Point(212,255.05963753949246),new Point(212,256),new Point(212,257),new Point(211,258),new Point(211,259),new Point(210,260),new Point(210,262),new Point(209,263),new Point(209,264),new Point(208,266),new Point(208,267),new Point(207,268),new Point(207,269),new Point(206.3609874192255,269.63901258077453),new Point(206,270),new Point(206,271),new Point(205,273),new Point(205,274),new Point(204,275),new Point(204,276),new Point(204,277),new Point(203,278),new Point(203,279),new Point(203,280),new Point(202,281),new Point(202,282),new Point(202,284),new Point(202,284.74776297702425),new Point(202,285),new Point(201,286),new Point(201,287),new Point(201,287),new Point(201,289),new Point(201,289),new Point(200,290),new Point(200,291),new Point(200,292),new Point(200,292),new Point(199,293),new Point(199,294),new Point(199,295),new Point(198,296),new Point(198,297),new Point(198,298),new Point(197,299),new Point(197,299.41368011091686),new Point(197,301),new Point(196,302),new Point(196,304),new Point(195,305),new Point(195,306),new Point(194,307),new Point(194,309),new Point(193,310),new Point(193,311),new Point(193,312),new Point(192,312),new Point(192,313),new Point(192,313.4938108071825),new Point(192,314),new Point(191,314),new Point(191,315),new Point(191,315),new Point(191,316),new Point(190,317),new Point(190,317),new Point(189,318),new Point(189,318),new Point(189,319),new Point(189,319),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(188,320),new Point(189,320),new Point(189,320),new Point(189,319),new Point(190,319),new Point(190,318),new Point(191,318),new Point(192,317),new Point(192,317),new Point(193,316),new Point(193.15972794107512,316),new Point(194,316),new Point(194,315),new Point(195,314),new Point(196,314),new Point(196,313),new Point(197,313),new Point(198,312),new Point(199,312),new Point(200,311),new Point(200,311),new Point(201,310),new Point(202,310),new Point(202,309),new Point(203,309),new Point(203,309),new Point(204,308),new Point(204.58381923136295,307.41618076863705),new Point(205,307),new Point(206,307),new Point(207,306),new Point(207,306),new Point(208,305),new Point(208,305),new Point(209,304),new Point(210,304),new Point(210,304),new Point(211,303),new Point(211,303),new Point(212,303),new Point(212,302),new Point(213,302),new Point(213,301),new Point(214,301),new Point(214,300),new Point(215,300),new Point(215,299),new Point(215.49156220886033,299),new Point(216,299),new Point(216,298),new Point(217,298),new Point(218,298),new Point(218,297),new Point(219,296),new Point(219,296),new Point(220,296),new Point(221,295),new Point(221,295),new Point(222,294),new Point(222,293),new Point(223,293),new Point(224,293),new Point(224,292),new Point(225,292),new Point(225,291),new Point(225.98590646749912,291),new Point(226,291),new Point(227,290),new Point(228,290),new Point(229,289),new Point(229,289),new Point(230,288),new Point(231,288),new Point(232,288),new Point(232,287),new Point(233,287),new Point(234,287),new Point(234,286),new Point(235,286),new Point(236,285),new Point(236,285),new Point(237,285),new Point(238,284),new Point(238.6518236013917,284),new Point(239,284),new Point(240,283),new Point(240,282),new Point(241,282),new Point(242,281),new Point(243,281),new Point(244,280),new Point(244,280),new Point(245,279),new Point(246,279),new Point(247,278),new Point(247,278),new Point(248,278),new Point(249,277),new Point(250,277),new Point(251,276),new Point(251,276),new Point(251.34599697213835,275.6540030278616),new Point(252,275),new Point(253,274),new Point(254,274),new Point(254,273),new Point(255,272),new Point(256,271),new Point(256,271),new Point(257,270),new Point(257,269),new Point(258,268),new Point(259,267),new Point(259,267),new Point(260,266),new Point(260,265),new Point(261,265),new Point(261,264.08740994268857),new Point(261,264),new Point(262,263),new Point(262,263),new Point(263,262),new Point(264,262),new Point(265,261),new Point(265,260),new Point(266,260),new Point(267,259),new Point(268,259),new Point(268,258),new Point(269,258),new Point(270,257),new Point(271,257),new Point(272,256),new Point(273,256),new Point(273.1161731390521,255.88382686094792),new Point(274,255),new Point(275,255),new Point(275,254),new Point(276,254),new Point(277,253),new Point(278,253),new Point(278,252),new Point(279,252),new Point(280,251),new Point(281,251),new Point(281,250),new Point(282,250),new Point(283,249),new Point(284,249),new Point(284,248),new Point(284.2444243250966,248),new Point(285,248),new Point(286,247),new Point(287,247),new Point(287,246),new Point(288,246),new Point(289,245),new Point(290,245),new Point(291,244),new Point(291,243),new Point(292,243),new Point(293,242),new Point(294,241),new Point(296,241),new Point(296.6437086188465,240.35629138115348),new Point(297,240),new Point(298,239),new Point(299,239),new Point(301,238),new Point(302,237),new Point(304,237),new Point(305,236),new Point(306,235),new Point(308,235),new Point(309,234),new Point(310.9259770530089,234),new Point(311,234),new Point(312,233),new Point(314,232),new Point(315,232),new Point(316,231),new Point(317,231),new Point(318,230),new Point(319,229),new Point(320,229),new Point(321,228),new Point(323,228),new Point(324,227),new Point(324.665820687965,226.33417931203505),new Point(325,226),new Point(326,225),new Point(327,225),new Point(328,224),new Point(329,223),new Point(330,223),new Point(331,222),new Point(332,221),new Point(333,220),new Point(334,219),new Point(335,218),new Point(336,218),new Point(337,217),new Point(337,217),new Point(337.379335896168,216.62066410383198),new Point(338,216),new Point(339,216),new Point(340,215),new Point(340,215),new Point(341,215),new Point(342,214),new Point(342,214),new Point(343,214),new Point(343,214),new Point(344,214),new Point(344,214),new Point(345,213),new Point(345,213),new Point(345,213),new Point(346,213),new Point(346,212),new Point(347,212),new Point(347,212),new Point(348,212),new Point(348,212),new Point(348,211),new Point(349,211),new Point(349,211),new Point(349,210),new Point(349.61659266532143,210),new Point(350,210),new Point(350,210),new Point(350,210),new Point(351,209),new Point(351,209),new Point(351,209),new Point(351,209),new Point(351,209),new Point(351,209),new Point(352,209),new Point(352,208),new Point(352,208),new Point(352,208),new Point(352,208),new Point(352,208),new Point(352,208),new Point(351,208),new Point(351,208),new Point(350,208),new Point(350,208),new Point(349,208),new Point(348,209),new Point(347,209),new Point(347,209),new Point(346,209),new Point(345,210),new Point(344,210),new Point(343,210),new Point(342,210),new Point(341,211),new Point(340.30327663841285,211),new Point(340,211),new Point(339,211),new Point(338,212),new Point(337,212),new Point(337,212),new Point(336,212),new Point(335,212),new Point(335,212),new Point(334,212),new Point(333,212),new Point(333,213),new Point(332,213),new Point(331,213),new Point(331,213),new Point(330,213),new Point(330,213),new Point(329,213),new Point(328,213),new Point(327,213),new Point(326,213),new Point(326,214),new Point(325.9805052550279,214),new Point(325,214),new Point(324,214),new Point(323,214),new Point(323,214),new Point(322,214),new Point(321,214),new Point(321,214),new Point(320,214),new Point(319,215),new Point(319,215),new Point(318,215),new Point(317,215),new Point(316,215),new Point(315,215),new Point(314,215),new Point(313,216),new Point(312,216),new Point(312,216),new Point(311,216),new Point(310.071947434016,216),new Point(310,216),new Point(309,216),new Point(308,216),new Point(307,217),new Point(306,217),new Point(305,217),new Point(304,217),new Point(303,217),new Point(302,217),new Point(302,217),new Point(301,217),new Point(300,217),new Point(299,217),new Point(299,217),new Point(298,217),new Point(297,217),new Point(297,217),new Point(296,217),new Point(295,217),new Point(295,217),new Point(294.1155339033307,217.88446609666934),new Point(294,218),new Point(293,218),new Point(293,218),new Point(292,218),new Point(291,218),new Point(291,218),new Point(290,218),new Point(289,218),new Point(288,218),new Point(287,218),new Point(287,218),new Point(286,218),new Point(285,218),new Point(284,218),new Point(283,218),new Point(283,218),new Point(282,218),new Point(281,218),new Point(280,218),new Point(279,218),new Point(279,218),new Point(278,218),new Point(277.42640466724606,218),new Point(277,218),new Point(276,218),new Point(275,218),new Point(275,218),new Point(274,218),new Point(273,218),new Point(272,218),new Point(271,218),new Point(270,218),new Point(269,218),new Point(268,218),new Point(267,218),new Point(266,218),new Point(265,218),new Point(264,218),new Point(263,218),new Point(262,218),new Point(261,218),new Point(260.689419721488,218),new Point(260,218),new Point(259,218),new Point(258,218),new Point(257,218),new Point(256,218),new Point(254,218),new Point(253,218),new Point(252,218),new Point(251,218),new Point(250,218),new Point(249,218),new Point(248,218),new Point(247,218),new Point(245,218),new Point(244,218),new Point(243.96636630736995,217.96636630736995),new Point(243,217),new Point(242,217),new Point(240,217),new Point(239,217),new Point(237,217),new Point(236,217),new Point(234,217),new Point(233,216),new Point(231,216),new Point(230,216),new Point(228.04387695471803,216),new Point(228,216),new Point(226,216),new Point(224,216),new Point(222,216),new Point(220,216),new Point(218,216),new Point(216,216),new Point(215,216),new Point(213,216),new Point(211.30689200895995,216),new Point(211,216),new Point(210,215),new Point(208,215),new Point(207,215),new Point(205,215),new Point(203,214),new Point(202,214),new Point(200,214),new Point(198,214),new Point(196,213),new Point(195.45625658057455,213),new Point(195,213),new Point(193,212),new Point(192,212),new Point(190,212),new Point(188,212),new Point(187,212),new Point(185,211),new Point(184,211),new Point(182,211),new Point(181,211),new Point(179.19140758981607,211),new Point(179,211),new Point(178,210),new Point(176,210),new Point(175,210),new Point(173,210),new Point(172,210),new Point(171,209),new Point(170,209),new Point(169,209),new Point(168,209),new Point(167,209),new Point(166,209),new Point(165,209),new Point(165,209),new Point(164,209),new Point(164,209),new Point(163.2828497688042,209),new Point(163,209),new Point(162,209),new Point(161,209),new Point(160,209),new Point(159,209),new Point(159,209),new Point(158,209),new Point(157,209),new Point(157,209),new Point(156,209),new Point(156,209),new Point(156,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(155,209),new Point(156,209),new Point(156,209),new Point(157,210),new Point(159,210),new Point(161,210),new Point(162,211),new Point(162.55965029552215,211.27982514776107),new Point(164,212),new Point(166,212),new Point(167,213),new Point(169,214),new Point(171,215),new Point(173,216),new Point(174,217),new Point(176,218),new Point(177.35392598572062,218),new Point(178,218),new Point(179,219),new Point(181,220),new Point(182,220),new Point(183,221),new Point(185,221),new Point(186,222),new Point(187,222),new Point(188,223),new Point(189,223),new Point(190,223),new Point(191,224),new Point(191.78377514211343,224),new Point(192,224),new Point(193,225),new Point(194,225),new Point(195,226),new Point(196,226),new Point(197,226),new Point(197,227),new Point(198,227),new Point(199,228),new Point(200,228),new Point(201,228),new Point(201,229),new Point(202,229),new Point(203,230),new Point(204,230),new Point(204,230),new Point(204.61087367662452,230.61087367662452),new Point(205,231),new Point(206,231),new Point(207,231),new Point(207,232),new Point(208,232),new Point(209,233),new Point(210,234),new Point(211,235),new Point(212,235),new Point(213,236),new Point(214,237),new Point(215,237),new Point(216,238),new Point(217,238),new Point(217.49596176008137,238.49596176008137),new Point(218,239),new Point(220,240),new Point(221,240),new Point(222,241),new Point(224,242),new Point(225,243),new Point(226,243),new Point(227,244),new Point(228,245),new Point(229,246),new Point(230,246),new Point(231,247),new Point(231,247.06674990167232),new Point(231,248),new Point(232,249),new Point(233,250),new Point(233,251),new Point(234,251),new Point(235,252),new Point(235,253),new Point(236,253),new Point(237,254),new Point(238,255),new Point(238,256),new Point(239,257),new Point(240,257),new Point(240.58963031824553,258.17926063649105),new Point(241,259),new Point(242,260),new Point(243,261),new Point(244,262),new Point(245,263),new Point(246,264),new Point(247,265),new Point(248,265),new Point(249,266),new Point(250,267),new Point(251,268),new Point(252,269),new Point(252.47887733206485,269.4788773320648),new Point(253,270),new Point(254,271),new Point(255,273),new Point(256,274),new Point(257,275),new Point(258,276),new Point(259,277),new Point(260,278),new Point(261,279),new Point(262,280),new Point(263,281),new Point(263.73257405374335,281.73257405374335),new Point(264,282),new Point(265,283),new Point(266,284),new Point(268,285),new Point(269,286),new Point(270,287),new Point(271,288),new Point(272,289),new Point(274,290),new Point(275,291),new Point(276,292),new Point(276.51245588006475,292.2562279400324),new Point(278,293),new Point(279,295),new Point(280,296),new Point(281,297),new Point(283,298),new Point(284,299),new Point(285,300),new Point(286,301),new Point(287,303),new Point(287.9154121767636,303.9154121767636),new Point(288,304),new Point(289,305),new Point(290,306),new Point(290,307),new Point(291,308),new Point(292,309),new Point(293,310),new Point(294,311),new Point(295,312),new Point(296,313),new Point(297,314),new Point(298,315),new Point(299,316),new Point(299.04314094733974,316.04314094733974),new Point(300,317),new Point(301,318),new Point(302,318),new Point(302,319),new Point(303,320),new Point(303,320),new Point(304,321),new Point(304,321),new Point(305,321),new Point(305,321),new Point(305,321),new Point(305,321),new Point(305,321),new Point(305,321),new Point(305,321),new Point(306,321),new Point(306,321),new Point(306,321),new Point(306,321),new Point(306,321),new Point(306,321),new Point(307,321),new Point(307,320),new Point(307,320),new Point(307,318),new Point(307,317),new Point(307,316),new Point(307,314.85885879091285),new Point(307,314),new Point(307,313),new Point(307,311),new Point(306,309),new Point(305,307),new Point(304,306),new Point(303,304),new Point(303,302),new Point(302,300),new Point(301.63255854964297,299.63255854964297),new Point(301,299),new Point(300,297),new Point(300,295),new Point(299,294),new Point(299,292),new Point(298,291),new Point(298,290),new Point(298,289),new Point(297,287),new Point(297,286),new Point(297,285),new Point(297,284.45815101388786),new Point(297,284),new Point(296,283),new Point(296,282),new Point(296,281),new Point(296,279),new Point(296,278),new Point(296,278),new Point(295,276),new Point(295,276),new Point(295,275),new Point(295,274),new Point(295,273),new Point(295,272),new Point(295,271),new Point(294,270),new Point(294,268.78566117037576),new Point(294,268),new Point(294,267),new Point(293,265),new Point(293,264),new Point(293,262),new Point(292,260),new Point(292,259),new Point(291,257),new Point(291,255),new Point(290,253),new Point(290,252.99294813461685),new Point(290,252),new Point(289,250),new Point(288,248),new Point(287,246),new Point(287,245),new Point(286,243),new Point(285,242),new Point(285,240),new Point(284,239),new Point(284,238.02866222360413),new Point(284,237),new Point(284,236),new Point(283,235),new Point(283,233),new Point(283,231),new Point(283,230),new Point(282,229),new Point(282,227),new Point(282,225),new Point(281,224),new Point(281,222.53431796496534),new Point(281,222),new Point(281,220),new Point(281,219),new Point(280,217),new Point(280,216),new Point(279,215),new Point(279,213),new Point(278,212),new Point(278,211),new Point(277,210),new Point(277,209),new Point(276.22902240293195,207.45804480586386),new Point(276,207),new Point(276,206),new Point(275,205),new Point(275,203),new Point(274,202),new Point(274,200),new Point(273,199),new Point(273,197),new Point(272,195),new Point(272,194),new Point(271.2190905476115,192.43818109522297),new Point(271,192),new Point(271,191),new Point(270,189),new Point(270,188),new Point(270,186),new Point(269,185),new Point(269,183),new Point(269,182),new Point(268,180),new Point(268,179),new Point(268,177),new Point(267.7449224924041,176.7449224924041),new Point(267,176),new Point(267,174),new Point(266,173),new Point(266,171),new Point(266,170),new Point(265,169),new Point(265,167),new Point(264,166),new Point(264,165),new Point(263,164),new Point(263,164),new Point(262.0936540279705,162.18730805594103),new Point(262,162),new Point(262,161),new Point(261,160),new Point(261,160),new Point(261,159),new Point(260,157),new Point(260,156),new Point(259,155),new Point(259,154),new Point(258,153),new Point(258,152),new Point(257,151),new Point(257,151),new Point(257,150),new Point(256,149),new Point(256,149),new Point(255.13702398565874,148.13702398565874),new Point(255,148),new Point(255,147),new Point(254,146),new Point(254,146),new Point(253,145),new Point(253,144),new Point(252,143),new Point(252,143),new Point(251,142),new Point(251,141),new Point(251,141),new Point(250,140),new Point(250,140),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(250,139),new Point(249,139),new Point(249,139),new Point(249,139),new Point(247,140),new Point(246,142))},
      {name: 'pentagram', points: new Array(new Point(214,248),new Point(214,249),new Point(214,249),new Point(214,249),new Point(214,249),new Point(214,249),new Point(214,249),new Point(214,249),new Point(214,249),new Point(214,248),new Point(214,246),new Point(214,244),new Point(215,242),new Point(215,239),new Point(216,236),new Point(216,233.95737305287162),new Point(216,232),new Point(217,229),new Point(218,225),new Point(218,221),new Point(218.77568137625866,217.8972744949654),new Point(219,217),new Point(220,214),new Point(221,210),new Point(222,206),new Point(223,203),new Point(223.22927296062275,202.08290815750894),new Point(224,199),new Point(225,196),new Point(225,193),new Point(226,190),new Point(227,187),new Point(227,186.2236493875805),new Point(227,185),new Point(228,182),new Point(228,180),new Point(229,177),new Point(230,174),new Point(231,172),new Point(231.47257780619162,170.58226658142516),new Point(232,169),new Point(233,167),new Point(234,165),new Point(235,163),new Point(236,161),new Point(237,159),new Point(238,158),new Point(238,156),new Point(238.12626361302011,155.87373638697989),new Point(239,155),new Point(239,154),new Point(239,153),new Point(240,151),new Point(240,150),new Point(241,148),new Point(241,146),new Point(242,144),new Point(242,142),new Point(243,141),new Point(243,140.9170947584817),new Point(243,140),new Point(244,139),new Point(244,138),new Point(244,138),new Point(245,137),new Point(245,137),new Point(245,137),new Point(246,136),new Point(246,136),new Point(246,135),new Point(247,135),new Point(247,135),new Point(247,135),new Point(248,135),new Point(248,135),new Point(248,135),new Point(249,135),new Point(249,135),new Point(250,135),new Point(251,135),new Point(252,137),new Point(252.91462745420762,138.8292549084152),new Point(253,139),new Point(254,141),new Point(255,143),new Point(257,146),new Point(258,150),new Point(260,153),new Point(260.1984419265927,153.39688385318544),new Point(262,157),new Point(264,161),new Point(266,166),new Point(267.14274947399736,168.28549894799474),new Point(268,170),new Point(270,174),new Point(271,179),new Point(273,182),new Point(273.6025735373025,183.20514707460498),new Point(275,186),new Point(277,190),new Point(278,193),new Point(280,197),new Point(280.5409864380925,198.081972876185),new Point(282,201),new Point(283,204),new Point(285,207),new Point(287,211),new Point(288.0753163893895,212.61297458408427),new Point(289,214),new Point(290,217),new Point(292,220),new Point(293,223),new Point(295,226),new Point(295.3003361398309,227.2013445593237),new Point(296,230),new Point(298,233),new Point(299,236),new Point(300,239),new Point(301,241),new Point(301.43955976133907,242.31867928401726),new Point(302,244),new Point(303,246),new Point(303,248),new Point(304,250),new Point(304,252),new Point(305,254),new Point(306,255),new Point(306,257),new Point(306.24430717171583,257.4886143434316),new Point(307,259),new Point(307,261),new Point(308,263),new Point(308,265),new Point(309,268),new Point(309,271),new Point(310,273),new Point(310,273.1167784354761),new Point(310,276),new Point(311,279),new Point(311,281),new Point(312,283),new Point(313,286),new Point(314,288),new Point(314,288.7610597449363),new Point(314,290),new Point(315,292),new Point(316,293),new Point(317,295),new Point(317,297),new Point(318,299),new Point(318,300),new Point(319,301),new Point(319,302),new Point(319,303),new Point(319,303),new Point(319,303.6654012724873),new Point(319,304),new Point(319,304),new Point(319,304),new Point(319,304),new Point(319,304),new Point(318,304),new Point(317,304),new Point(316,305),new Point(315,305),new Point(315,305),new Point(314,305),new Point(314,305),new Point(313,305),new Point(313,305),new Point(313,305),new Point(313,305),new Point(313,305),new Point(313,306),new Point(314,306),new Point(314,307),new Point(314,307),new Point(314,308),new Point(315,309),new Point(315,309),new Point(315,310),new Point(315,311),new Point(315,312),new Point(315,312),new Point(315,313),new Point(314.7220532674623,313),new Point(314,313),new Point(314,314),new Point(313,314),new Point(312,314),new Point(311,313),new Point(309,311),new Point(308,310),new Point(306,308),new Point(304,306),new Point(302.8307939249856,305.2205292833237),new Point(301,304),new Point(298,302),new Point(294,299),new Point(291,297),new Point(289.1847335616126,296.0923667808063),new Point(287,295),new Point(282,292),new Point(278,290),new Point(274.5690201794655,288.6276080717862),new Point(273,288),new Point(269,286),new Point(264,284),new Point(260,282),new Point(259.6085083443723,281.8434033377489),new Point(255,280),new Point(251,278),new Point(246,275),new Point(244.9496121255089,274.47480606275445),new Point(242,273),new Point(238,271),new Point(234,268),new Point(230.71649515418227,266.3582475770911),new Point(230,266),new Point(226,264),new Point(223,262),new Point(219,260),new Point(216.0021787023997,259.25054467559994),new Point(215,259),new Point(212,257),new Point(208,255),new Point(204,253),new Point(201.3462954800267,251.93851819201066),new Point(199,251),new Point(195,250),new Point(191,248),new Point(187,246),new Point(186.19688505793735,245.73229501931246),new Point(184,245),new Point(180,243),new Point(177,242),new Point(174,241),new Point(172,240),new Point(170.9635699937134,239.6545233312378),new Point(169,239),new Point(167,238),new Point(166,237),new Point(164,235),new Point(163,235),new Point(162,234),new Point(162,233),new Point(162,232),new Point(162,231),new Point(162,230),new Point(162,228.5217341506279),new Point(162,228),new Point(162,227),new Point(162,226),new Point(162,224),new Point(162,223),new Point(162,222),new Point(163,221),new Point(163,220),new Point(163,219),new Point(163,218),new Point(163,217),new Point(162,216),new Point(162,215),new Point(161.0649607568012,213.1299215136024),new Point(161,213),new Point(161,212),new Point(160,210),new Point(159,209),new Point(159,209),new Point(158,208),new Point(158,207),new Point(158,206),new Point(157,206),new Point(157,205),new Point(157,204),new Point(156,204),new Point(156,203),new Point(156,203),new Point(156,202),new Point(155,202),new Point(155,202),new Point(155,201),new Point(155,201),new Point(155,201),new Point(155,201),new Point(155,201),new Point(155,201),new Point(155.23122081447326,201),new Point(157,201),new Point(158,201),new Point(161,202),new Point(163,202),new Point(167,203),new Point(170,203),new Point(171.345403430722,203.3363508576805),new Point(174,204),new Point(179,204),new Point(183,204),new Point(187.7046770726627,204),new Point(189,204),new Point(194,204),new Point(199,204),new Point(204,204),new Point(204.14564965745924,204),new Point(210,204),new Point(216,204),new Point(220.5866222422558,204),new Point(221,204),new Point(227,204),new Point(231,204),new Point(236,204),new Point(237.0076396298475,203.7984720740305),new Point(241,203),new Point(245,203),new Point(249,203),new Point(253,202),new Point(253.24644227263846,202),new Point(256,202),new Point(260,202),new Point(263,201),new Point(266,201),new Point(269,201),new Point(269.52513719726664,201),new Point(272,201),new Point(274,200),new Point(277,200),new Point(279,200),new Point(282,199),new Point(285,199),new Point(285.567764144395,199),new Point(287,199),new Point(290,198),new Point(292,198),new Point(295,198),new Point(297,197),new Point(300,197),new Point(301.6103910915234,197),new Point(302,197),new Point(305,196),new Point(308,196),new Point(311,196),new Point(314,196),new Point(317,196),new Point(317.8890860161516,196),new Point(320,196),new Point(323,196),new Point(325,196),new Point(327,196),new Point(328,196),new Point(330,196),new Point(331,197),new Point(332,197),new Point(333,198),new Point(333,198),new Point(333.501631476202,198),new Point(334,198),new Point(335,199),new Point(336,199),new Point(337,199),new Point(338,199),new Point(340,199),new Point(341,200),new Point(343,200),new Point(345,200),new Point(346,200),new Point(347,201),new Point(348.6999633738793,201),new Point(349,201),new Point(350,201),new Point(350,201),new Point(351,201),new Point(352,201),new Point(352,201),new Point(352,201),new Point(352,202),new Point(352,202),new Point(352,202),new Point(352,203),new Point(352,203),new Point(351,203),new Point(350,204),new Point(349,205),new Point(348,205),new Point(347,206),new Point(346,207),new Point(344,208),new Point(343.11752102731253,208.88247897268747),new Point(343,209),new Point(341,210),new Point(339,211),new Point(337,213),new Point(335,215),new Point(333,217),new Point(331,218),new Point(330.23541431355335,218.76458568644668),new Point(329,220),new Point(326,223),new Point(324,225),new Point(321,227),new Point(319,229),new Point(318.0108696802342,229.6594202131772),new Point(316,231),new Point(313,233),new Point(310,235),new Point(307,237),new Point(304.33115360185377,238.77923093209748),new Point(304,239),new Point(302,240),new Point(299,242),new Point(297,243),new Point(295,245),new Point(293,247),new Point(291.36769065926114,248.63230934073886),new Point(291,249),new Point(288,251),new Point(285,253),new Point(282,255),new Point(279,257),new Point(277.8009805073155,257.89926461951336),new Point(275,260),new Point(272,262),new Point(269,264),new Point(266,266),new Point(264.49874645474506,267.50125354525494),new Point(264,268),new Point(261,269),new Point(259,271),new Point(257,272),new Point(255,273),new Point(253,275),new Point(251.27156888840145,276.7284311115985),new Point(251,277),new Point(249,279),new Point(247,281),new Point(244,283),new Point(242,285),new Point(240,287),new Point(238.9824491771275,287.50877541143626),new Point(238,288),new Point(235,290),new Point(233,292),new Point(231,293),new Point(229,295),new Point(226,297),new Point(225.83132941093547,297.1686705890645),new Point(224,299),new Point(221,301),new Point(218,303),new Point(215,305),new Point(213,306),new Point(212.33572441788306,306.44285038807794),new Point(210,308),new Point(208,309),new Point(205,311),new Point(203,312),new Point(202,313),new Point(201,314),new Point(200,315),new Point(199.07124827714648,315.9287517228535),new Point(199,316),new Point(199,316),new Point(198,316),new Point(198,317),new Point(198,317),new Point(197,317),new Point(197,317),new Point(197,317),new Point(197,317),new Point(197,317),new Point(197,316),new Point(197,316),new Point(196,315),new Point(196,315),new Point(196,314),new Point(196,313),new Point(195,312),new Point(195,312),new Point(195,310),new Point(195,309),new Point(195,307),new Point(195,305),new Point(195,304.48821481978587),new Point(195,302),new Point(195,299),new Point(195,296),new Point(195,293),new Point(196,289),new Point(196.26235904261134,288.21292287216596),new Point(197,286),new Point(198,282),new Point(199,279),new Point(200,276),new Point(201,273),new Point(201.1576105932051,272.5271682203847),new Point(202,270),new Point(203,268),new Point(203,266),new Point(204,264),new Point(204,262),new Point(204,260),new Point(204,257),new Point(204,256.695032572473),new Point(204,255),new Point(204,253),new Point(204,251),new Point(204,248),new Point(204,246),new Point(204,244),new Point(204,242),new Point(204,240.25405998767644),new Point(204,240),new Point(205,239),new Point(206,237),new Point(207,235),new Point(208,234),new Point(209,232),new Point(209,231),new Point(210,230),new Point(210,230),new Point(210,230),new Point(210,230),new Point(210,232),new Point(209,234))},
    ];

window.addEventListener( 'resize', sizeCanvas );

function initCallback() {
    // Connect to the socket
    socket = io( '/' + gameId );

    var playerName = localStorage.playerName || prompt( 'what is your name?' );
    localStorage.playerName = playerName;

    var playerNameContainer = document.getElementById('name');
    playerNameContainer.innerHTML = localStorage.playerName;

    console.log( 'joining' );
    // player joins game
    socket.emit( 'controller joined', playerName );

    // Setup the canvas
    _points = new Array();
    _r = new DollarRecognizer(gesturesDarkPatterns);

    stats = document.getElementById('stats');
    canvas = document.getElementById('gesture');
    _g = canvas.getContext('2d');
    sizeCanvas();

    // Add events
    canvas.addEventListener('touchstart', function( e ) {
      touchStartEvent(e.touches[0].clientX, e.touches[0].clientY)
    } );
    canvas.addEventListener('touchmove', function( e ) {
      touchMoveEvent(event.touches[0].clientX, event.touches[0].clientY);
    } );
    canvas.addEventListener('touchend', function( e ) {
      touchEndEvent();
    } );
    canvas.addEventListener('oncontextmenu', function ( e ) {
      return false;
    } );

    _isDown = false;
  }

// Socket handlers
socketHandlers = {
  'players': playerJoined,
  'ready?': areYouReady,
  'play': showPlay,
  'requestPause': confirmPause,
  'paused': pause,
  'update': update
};

var players = {};

function playerJoined( playerData ) {
  playerData.forEach( setPlayer );

  function setPlayer( playerData ) {
    players[ playerData.id ] = {
      name: playerData.name,
      resources: playerData.resources,
      avatar: playerData.avatar
    };

    if (playerData.id == socket.nsp + '#' + socket.id) {
      updateViewResources(playerData.resources );
    }
  }
}

function updateViewResources(resources) {
  var i = 0,
      _resourceContainer;

  resources.forEach ( updateResource );

  function updateResource( resource ) {
    _resourceContainer = document.getElementById('resource_' + i);
    _resourceContainer.innerHTML = resource;
    i++;
  } 
}

function areYouReady( customMessage ) {
  console.log( 'areyouready?' );
  if( true || prompt( customMessage || 'are you ready?' ) ) socket.emit( 'ready' );
}

function showPlay() {
  console.log( 'play' );
}

function summon(gesture) {
  socket.emit( 'gesture' , gesture );
}

function askPause() {
  socket.emit( 'request pause' );
}

function confirmPause( customMsg ) {
  if( confirm( customMsg || 'do you agree to pause the game?' ) ) socket.emit( 'confirm pause' );
}

function pause() {
  console.log( 'pause...' );
}

function update( data ) {
  console.log( data );

  Object.keys( data ).forEach( updatePlayer );

  return;

  function updatePlayer( playerId ) {
    var player = players[ playerId ],
    currentPlayer = socket.nsp + socket.id == playerId,
    info = data[ playerId ],
    updateHandlers = {
      resources: updateResources,
      mobs: updateMobs
    };

    Object.keys( info ).forEach( processUpdate );

    function processUpdate( key ) {
      ( updateHandlers[ key ] || console.log.bind( console, key ) ) ( info[ key ] );
    }

    function updateMobs( mobs ) {
      console.log(mobs);
      // mobs.forEach( updateMob );
    }

    function updateMob( mob ) {
      if (mob.finished && playerId == socket.nsp + '#' + socket.id) {
        alert('Lose health');
      }
    }

    function updateResources( resources ) {
      if (playerId == socket.nsp + '#' + socket.id) {
        console.log('UPDATE RESOURCE!');
        console.log(resources);
        updateViewResources ( resources );
      }
      
      resources.forEach( updateResource );

      console.log( resources );
    }

    function updateResource( value, index ) {
      if( value !== null ) player.resources[ index ] = value;
    }
  }
}

// Gestures
function sizeCanvas() {
  var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  width = width-37;

  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  stats.style.height = height + 'px';
  stats.style.width = (width/100*40) + 'px';

  canvas.width = width/100*60;
  canvas.height = height;

  _rc = getCanvasRect(canvas);
}

function getCanvasRect(canvas) {
  var w = canvas.width;
  var h = canvas.height;

  var cx = canvas.offsetLeft;
  var cy = canvas.offsetTop;
  while ( canvas.offsetParent != null ) {
    canvas = canvas.offsetParent;
    cx += canvas.offsetLeft;
    cy += canvas.offsetTop;
  }
  return {x: cx, y: cy, width: w, height: h};
}

function getScrollY() {
  var scrollY = 0;
  if (typeof(document.body.parentElement) != 'undefined') {
        scrollY = document.body.parentElement.scrollTop; // IE
      } else if (typeof(window.pageYOffset) != 'undefined') {
        scrollY = window.pageYOffset; // FF
      }
      return scrollY;
    }

  function touchStartEvent(x, y) {
    document.onselectstart = function() { return false; } // disable drag-select
    document.onmousedown = function() { return false; } // disable drag-select
    _isDown = true;
    x -= _rc.x;
    y -= _rc.y - getScrollY();
    if (_points.length > 0)
      _g.clearRect(0, 0, _rc.width, _rc.height);
    _points.length = 1; // clear
    _points[0] = new Point(x, y);
    console.log("Recording unistroke...");
    _g.fillStyle = "rgb(138,7,7)";
    _g.strokeStyle = "rgb(138,7,7)";
    _g.lineWidth = 5;
    _g.fillRect(x - 4, y - 3, 9, 9);
  }

  function touchMoveEvent(x, y) {
    lastX = x;
    lastY = y;
    if (_isDown)
    {
      x -= _rc.x;
      y -= _rc.y - getScrollY();
        _points[_points.length] = new Point(x, y); // append
        drawConnectedPoint(_points.length - 2, _points.length - 1);
    }
  }

  function touchEndEvent() {
    x = lastX;
    y = lastY;
    document.onselectstart = function() { return true; } // enable drag-select
    document.onmousedown = function() { return true; } // enable drag-select
    if (_isDown) {
      _isDown = false;
      if (_points.length >= 10) {
        var result = _r.Recognize(_points, false);
            if (result.Score*100 >= 80) { // accurate
              console.log("Summon: " + result.Name)
              summon(result.Name);
            }
            console.log("Result: " + result.Name + " (" + round(result.Score,2) + ").");
      } 
    }
  }

  function drawConnectedPoint(from, to) {
    _g.beginPath();
    _g.moveTo(_points[from].X, _points[from].Y);
    _g.lineTo(_points[to].X, _points[to].Y);
    _g.closePath();
    _g.stroke();
  }

  function round(n, d) {
    d = Math.pow(10, d);
    return Math.round(n * d) / d
  }


