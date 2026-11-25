/* Geometry Chapter 9 practice test — Big Ideas Math 9.1–9.6 (+ optional 9.7).
   Numeric keys were verified with Python (math) before deploy. */
window.CH9 = [
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "In right triangle <b>ABC</b>, the right angle is at <b>C</b>, leg <i>AC</i> = 8, and leg <i>BC</i> = 15. Find the hypotenuse <i>AB</i>.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle ABC with legs 8 and 15\"><polygon class=\"face\" points=\"50.0,60.0 220.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"60.0\" x2=\"220.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"220.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"60.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"34.0\" y=\"56.0\">A</text><text class=\"lname\" x=\"228.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"34.0\" y=\"136.0\">8</text><text class=\"anum\" x=\"135.0\" y=\"218.0\">15</text><text class=\"anum\" x=\"143.0\" y=\"122.0\">?</text></svg></div>",
    "parts": [
      {
        "l": "AB =",
        "t": "num",
        "a": 17,
        "show": "17"
      }
    ],
    "e": [
      "This is a right triangle, so the Pythagorean Theorem applies: <i>a</i>² + <i>b</i>² = <i>c</i>², where <i>c</i> is the hypotenuse (the side opposite the right angle).",
      "The legs are 8 and 15, and <i>AB</i> is the hypotenuse, so 8² + 15² = <i>AB</i>².",
      "64 + 225 = 289, so <i>AB</i>² = 289.",
      "<i>AB</i> = √289 = <b>17</b>. (8-15-17 is a Pythagorean triple — a good one to memorize, along with 3-4-5, 5-12-13, 7-24-25, 9-12-15, and 20-21-29.)"
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "The legs of a right triangle are <i>x</i> and <i>x</i> + 7, and the hypotenuse is <i>x</i> + 8. Find <i>x</i> and the length of the hypotenuse.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with sides x, x+7, and x+8\"><polygon class=\"face\" points=\"50.0,80.0 210.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"80.0\" x2=\"210.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"210.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"80.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"74.0\"></text><text class=\"lname\" x=\"220.0\" y=\"216.0\"></text><text class=\"lname\" x=\"34.0\" y=\"216.0\"></text><text class=\"anum\" x=\"34.0\" y=\"146.0\">x</text><text class=\"anum\" x=\"130.0\" y=\"218.0\">x + 7</text><text class=\"anum\" x=\"140.0\" y=\"132.0\">x + 8</text></svg></div>",
    "parts": [
      {
        "l": "x =",
        "t": "num",
        "a": 5,
        "show": "5"
      },
      {
        "l": "Hypotenuse =",
        "t": "num",
        "a": 13,
        "show": "13"
      }
    ],
    "e": [
      "Use the Pythagorean Theorem: <i>x</i>² + (<i>x</i> + 7)² = (<i>x</i> + 8)².",
      "Expand: <i>x</i>² + (<i>x</i>² + 14<i>x</i> + 49) = <i>x</i>² + 16<i>x</i> + 64.",
      "2<i>x</i>² + 14<i>x</i> + 49 = <i>x</i>² + 16<i>x</i> + 64.",
      "Subtract <i>x</i>² from both sides: <i>x</i>² + 14<i>x</i> + 49 = 16<i>x</i> + 64.",
      "Bring all terms to the left: <i>x</i>² + 14<i>x</i> − 16<i>x</i> + 49 − 64 = 0 → <i>x</i>² − 2<i>x</i> − 15 = 0.",
      "Factor: (<i>x</i> − 5)(<i>x</i> + 3) = 0, so <i>x</i> = 5 or <i>x</i> = −3. A length cannot be negative, so <i>x</i> = <b>5</b>.",
      "The sides are 5, 12, and 13. The hypotenuse is 5 + 8 = <b>13</b>. (Check: 5² + 12² = 25 + 144 = 169 = 13².)"
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "A 13-foot ladder leans against a vertical wall. The bottom of the ladder is 5 feet from the base of the wall. How high up the wall does the ladder reach?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 320 240\" width=\"320\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"ladder leaning against a wall\"><rect x=\"40\" y=\"30\" width=\"30\" height=\"170\" fill=\"#e2e8f0\" stroke=\"#64748b\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"200.0\" x2=\"300.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"70.0\" y1=\"50.0\" x2=\"132.5\" y2=\"200.0\"/><path class=\"rmark\" d=\"M70.0,187.0 L83.0,187.0 L83.0,200.0\"/><path class=\"rmark\" d=\"M70.0,187.0 L83.0,187.0 L83.0,200.0\"/><text class=\"anum\" x=\"48.0\" y=\"28.0\">wall</text><text class=\"anum\" x=\"100.0\" y=\"120.0\">13 ft</text><text class=\"anum\" x=\"101.2\" y=\"218.0\" text-anchor=\"middle\">5 ft</text><text class=\"alab\" x=\"50.0\" y=\"130.0\">?</text></svg></div>",
    "parts": [
      {
        "l": "Height (ft) =",
        "t": "num",
        "a": 12,
        "show": "12 ft"
      }
    ],
    "e": [
      "The wall, the ground, and the ladder form a right triangle. The ladder is the hypotenuse (13 ft), and one leg (the distance from the wall) is 5 ft.",
      "Let <i>h</i> be the height the ladder reaches on the wall. Then 5² + <i>h</i>² = 13².",
      "25 + <i>h</i>² = 169, so <i>h</i>² = 144.",
      "<i>h</i> = √144 = <b>12</b> feet. (This is the 5-12-13 triple.)"
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "A triangle has side lengths 7, 8, and 11. Use the converse of the Pythagorean Theorem to classify the triangle as acute, right, or obtuse.",
    "parts": [
      {
        "l": "The triangle is",
        "t": "mc",
        "a": 2,
        "c": [
          "acute",
          "right",
          "obtuse"
        ],
        "show": "obtuse"
      }
    ],
    "e": [
      "The converse of the Pythagorean Theorem: compare <i>c</i>² with <i>a</i>² + <i>b</i>², where <i>c</i> is the <b>longest</b> side.",
      "If <i>a</i>² + <i>b</i>² = <i>c</i>², the triangle is right. If <i>a</i>² + <i>b</i>² &gt; <i>c</i>², it is acute (all angles acute). If <i>a</i>² + <i>b</i>² &lt; <i>c</i>², it is obtuse (the angle opposite <i>c</i> is obtuse).",
      "The longest side is 11. Compare 7² + 8² with 11²: 49 + 64 = 113, and 11² = 121.",
      "113 &lt; 121, so <i>a</i>² + <i>b</i>² &lt; <i>c</i>². The triangle is <b>obtuse</b>."
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "A triangle has side lengths 9, 12, and 15. Classify the triangle as acute, right, or obtuse.",
    "parts": [
      {
        "l": "The triangle is",
        "t": "mc",
        "a": 1,
        "c": [
          "acute",
          "right",
          "obtuse"
        ],
        "show": "right"
      }
    ],
    "e": [
      "Longest side <i>c</i> = 15. Compare 9² + 12² with 15².",
      "81 + 144 = 225, and 15² = 225.",
      "They are equal, so the triangle is <b>right</b>. (9-12-15 is a multiple of the 3-4-5 triple: each side × 3.)"
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "A triangle has side lengths 6, 7, and 8. Classify the triangle as acute, right, or obtuse.",
    "parts": [
      {
        "l": "The triangle is",
        "t": "mc",
        "a": 0,
        "c": [
          "acute",
          "right",
          "obtuse"
        ],
        "show": "acute"
      }
    ],
    "e": [
      "Longest side <i>c</i> = 8. Compare 6² + 7² with 8².",
      "36 + 49 = 85, and 8² = 64.",
      "85 &gt; 64, so <i>a</i>² + <i>b</i>² &gt; <i>c</i>². Every angle is acute, so the triangle is <b>acute</b>.",
      "A common mistake is to compare with the wrong side. Always use the longest side as <i>c</i>."
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "A 26-foot guy wire is attached to the top of a vertical pole and to a point on the ground 10 feet from the base of the pole. How tall is the pole?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 320 240\" width=\"320\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"guy wire from the top of a pole to the ground\"><rect x=\"62\" y=\"60\" width=\"16\" height=\"140\" fill=\"#94a3b8\" stroke=\"#334155\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"200.0\" x2=\"300.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"70.0\" y1=\"60.0\" x2=\"128.3\" y2=\"200.0\"/><path class=\"rmark\" d=\"M70.0,187.0 L83.0,187.0 L83.0,200.0\"/><text class=\"alab\" x=\"40.0\" y=\"130.0\">?</text><text class=\"anum\" x=\"113.2\" y=\"130.0\">26 ft</text><text class=\"anum\" x=\"99.2\" y=\"218.0\" text-anchor=\"middle\">10 ft</text><text class=\"anum\" x=\"78.0\" y=\"54.0\">pole</text></svg></div>",
    "parts": [
      {
        "l": "Height of the pole (ft) =",
        "t": "num",
        "a": 24,
        "show": "24 ft"
      }
    ],
    "e": [
      "The pole, the ground, and the guy wire form a right triangle. The wire is the hypotenuse (26 ft), and the distance from the base is one leg (10 ft).",
      "Let <i>h</i> be the height of the pole. Then 10² + <i>h</i>² = 26².",
      "100 + <i>h</i>² = 676, so <i>h</i>² = 576.",
      "<i>h</i> = √576 = <b>24</b> feet. (10-24-26 is a multiple of 5-12-13.)"
    ]
  },
  {
    "s": "9.1 Pythagorean Theorem",
    "p": "Find the distance between points <b>A</b>(−2, 4) and <b>B</b>(10, 9) on the coordinate plane.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 320 260\" width=\"320\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"coordinate plane with points A and B\"><line class=\"gridln\" x1=\"28.0\" y1=\"220.0\" x2=\"28.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"42.0\" y1=\"220.0\" x2=\"42.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"56.0\" y1=\"220.0\" x2=\"56.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"70.0\" y1=\"220.0\" x2=\"70.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"84.0\" y1=\"220.0\" x2=\"84.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"98.0\" y1=\"220.0\" x2=\"98.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"112.0\" y1=\"220.0\" x2=\"112.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"126.0\" y1=\"220.0\" x2=\"126.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"140.0\" y1=\"220.0\" x2=\"140.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"154.0\" y1=\"220.0\" x2=\"154.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"168.0\" y1=\"220.0\" x2=\"168.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"182.0\" y1=\"220.0\" x2=\"182.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"196.0\" y1=\"220.0\" x2=\"196.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"210.0\" y1=\"220.0\" x2=\"210.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"224.0\" y1=\"220.0\" x2=\"224.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"238.0\" y1=\"220.0\" x2=\"238.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"252.0\" y1=\"220.0\" x2=\"252.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"266.0\" y1=\"220.0\" x2=\"266.0\" y2=\"66.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"220.0\" x2=\"266.0\" y2=\"220.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"206.0\" x2=\"266.0\" y2=\"206.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"192.0\" x2=\"266.0\" y2=\"192.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"178.0\" x2=\"266.0\" y2=\"178.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"164.0\" x2=\"266.0\" y2=\"164.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"150.0\" x2=\"266.0\" y2=\"150.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"136.0\" x2=\"266.0\" y2=\"136.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"122.0\" x2=\"266.0\" y2=\"122.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"108.0\" x2=\"266.0\" y2=\"108.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"94.0\" x2=\"266.0\" y2=\"94.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"80.0\" x2=\"266.0\" y2=\"80.0\"/><line class=\"gridln\" x1=\"28.0\" y1=\"66.0\" x2=\"266.0\" y2=\"66.0\"/><line class=\"axis\" x1=\"28.0\" y1=\"220.0\" x2=\"266.0\" y2=\"220.0\"/><line class=\"axis\" x1=\"70.0\" y1=\"227.0\" x2=\"70.0\" y2=\"66.0\"/><line class=\"ln-main\" x1=\"42.0\" y1=\"164.0\" x2=\"210.0\" y2=\"94.0\"/><line class=\"ln-hid\" x1=\"42.0\" y1=\"164.0\" x2=\"210.0\" y2=\"164.0\"/><line class=\"ln-hid\" x1=\"210.0\" y1=\"164.0\" x2=\"210.0\" y2=\"94.0\"/><path class=\"rmark\" d=\"M200.0,164.0 L200.0,154.0 L210.0,154.0\"/><circle class=\"dot pre\" cx=\"42.0\" cy=\"164.0\" r=\"4\"/><text class=\"vlab pre\" x=\"54.0\" y=\"148.0\">A (−2, 4)</text><circle class=\"dot pre\" cx=\"210.0\" cy=\"94.0\" r=\"4\"/><text class=\"vlab pre\" x=\"222.0\" y=\"78.0\">B (10, 9)</text><text class=\"axlab\" x=\"270.0\" y=\"224.0\">x</text><text class=\"axlab\" x=\"78.0\" y=\"64.0\">y</text></svg></div>",
    "parts": [
      {
        "l": "Distance AB =",
        "t": "num",
        "a": 13,
        "show": "13"
      }
    ],
    "e": [
      "The distance formula is a restatement of the Pythagorean Theorem: <i>d</i> = √[(<i>x</i>₂ − <i>x</i>₁)² + (<i>y</i>₂ − <i>y</i>₁)²].",
      "Δ<i>x</i> = 10 − (−2) = 12, and Δ<i>y</i> = 9 − 4 = 5.",
      "<i>d</i> = √(12² + 5²) = √(144 + 25) = √169 = <b>13</b>. (5-12-13 triple.)"
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "In a 45°-45°-90° triangle, the hypotenuse is 10√2. What is the length of each leg?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"45-45-90 triangle with hypotenuse 10 radical 2\"><polygon class=\"face\" points=\"50.0,50.0 200.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"50.0\" x2=\"200.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"200.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"50.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"44.0\">A</text><text class=\"lname\" x=\"210.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"135.0\" y=\"117.0\">10√2</text><text class=\"anum\" x=\"34.0\" y=\"131.0\">?</text><text class=\"anum\" x=\"125.0\" y=\"218.0\">?</text><text class=\"alab\" x=\"58.0\" y=\"72.0\" text-anchor=\"middle\">45°</text><path class=\"arc\" d=\"M65.6,65.6 A22,22 0 0 1 50.0,72.0\"/><text class=\"alab\" x=\"172.0\" y=\"196.0\" text-anchor=\"middle\">45°</text><path class=\"arc\" d=\"M184.4,184.4 A22,22 0 0 0 178.0,200.0\"/></svg></div>",
    "parts": [
      {
        "l": "Each leg =",
        "t": "num",
        "a": 10,
        "show": "10"
      }
    ],
    "e": [
      "In a 45°-45°-90° triangle, the legs are equal and the hypotenuse is <i>leg</i> · √2.",
      "So <i>leg</i> · √2 = 10√2, which means <i>leg</i> = 10.",
      "Equivalently, <i>leg</i> = hypotenuse / √2 = 10√2 / √2 = <b>10</b>.",
      "You can also rationalize: hypotenuse · √2 / 2 = 10√2 · √2 / 2 = 10·2 / 2 = 10."
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "In a 45°-45°-90° triangle, each leg has length 7. What is the length of the hypotenuse?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"45-45-90 triangle with legs 7\"><polygon class=\"face\" points=\"50.0,60.0 190.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"60.0\" x2=\"190.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"190.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"60.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"54.0\">A</text><text class=\"lname\" x=\"200.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"36.0\" y=\"136.0\">7</text><text class=\"anum\" x=\"120.0\" y=\"218.0\">7</text><text class=\"anum\" x=\"128.0\" y=\"122.0\">?</text><text class=\"alab\" x=\"58.0\" y=\"82.0\" text-anchor=\"middle\">45°</text><path class=\"arc\" d=\"M65.6,75.6 A22,22 0 0 1 50.0,82.0\"/><text class=\"alab\" x=\"162.0\" y=\"196.0\" text-anchor=\"middle\">45°</text><path class=\"arc\" d=\"M174.4,184.4 A22,22 0 0 0 168.0,200.0\"/></svg></div>",
    "parts": [
      {
        "l": "Hypotenuse =",
        "t": "mc",
        "a": 2,
        "c": [
          "7",
          "7√2 / 2",
          "7√2",
          "14"
        ],
        "show": "7√2"
      }
    ],
    "e": [
      "45°-45°-90° pattern: hypotenuse = <i>leg</i> · √2.",
      "hypotenuse = 7√2.",
      "A common mistake is to divide by √2 (that’s how you go from hypotenuse to a leg) or to double the leg (that’s the 30°-60°-90° short-to-hypotenuse rule, not 45°-45°-90°)."
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "In a 30°-60°-90° triangle, the shorter leg is 5. Find the hypotenuse and the longer leg.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"30-60-90 triangle with short leg 5\"><polygon class=\"face\" points=\"50.0,100.0 223.2,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"100.0\" x2=\"223.2\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"223.2\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"100.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"94.0\">A</text><text class=\"lname\" x=\"233.2\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"36.0\" y=\"156.0\">5</text><text class=\"anum\" x=\"136.6\" y=\"218.0\">?</text><text class=\"anum\" x=\"146.6\" y=\"142.0\">?</text><text class=\"alab\" x=\"193.2\" y=\"196.0\" text-anchor=\"middle\">30°</text><path class=\"arc\" d=\"M204.2,189.0 A22,22 0 0 0 201.2,200.0\"/><text class=\"alab\" x=\"60.0\" y=\"124.0\" text-anchor=\"middle\">60°</text><path class=\"arc\" d=\"M69.1,111.0 A22,22 0 0 1 50.0,122.0\"/></svg></div>",
    "parts": [
      {
        "l": "Hypotenuse =",
        "t": "num",
        "a": 10,
        "show": "10"
      },
      {
        "l": "Longer leg =",
        "t": "mc",
        "a": 1,
        "c": [
          "5√2",
          "5√3",
          "10√3",
          "15"
        ],
        "show": "5√3"
      }
    ],
    "e": [
      "In a 30°-60°-90° triangle: the short leg is opposite 30°, the long leg is opposite 60°, and the hypotenuse is opposite 90°.",
      "The pattern is: hypotenuse = 2 · (short leg), and long leg = (short leg) · √3.",
      "Short leg = 5, so the hypotenuse is 2 · 5 = <b>10</b>.",
      "The longer leg is 5√3."
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "In a 30°-60°-90° triangle, the hypotenuse is 18. What is the length of the longer leg?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"30-60-90 triangle with hypotenuse 18\"><polygon class=\"face\" points=\"50.0,110.0 205.9,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"110.0\" x2=\"205.9\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"205.9\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"110.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"104.0\">A</text><text class=\"lname\" x=\"215.9\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"137.9\" y=\"147.0\">18</text><text class=\"anum\" x=\"36.0\" y=\"161.0\">?</text><text class=\"anum\" x=\"127.9\" y=\"218.0\">?</text><text class=\"alab\" x=\"175.9\" y=\"196.0\" text-anchor=\"middle\">30°</text><path class=\"arc\" d=\"M186.8,189.0 A22,22 0 0 0 183.9,200.0\"/><text class=\"alab\" x=\"60.0\" y=\"134.0\" text-anchor=\"middle\">60°</text><path class=\"arc\" d=\"M69.1,121.0 A22,22 0 0 1 50.0,132.0\"/></svg></div>",
    "parts": [
      {
        "l": "Longer leg =",
        "t": "mc",
        "a": 2,
        "c": [
          "9",
          "9√2",
          "9√3",
          "18√3"
        ],
        "show": "9√3"
      }
    ],
    "e": [
      "First find the short leg: short = hypotenuse / 2 = 18 / 2 = 9.",
      "Then long leg = short · √3 = 9√3.",
      "Don’t multiply the hypotenuse by √3 (that would be 18√3, a common error), and don’t use √2 (that’s 45°-45°-90°)."
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "In a 30°-60°-90° triangle, the longer leg is 6√3. What is the length of the shorter leg?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"30-60-90 triangle with long leg 6 radical 3\"><polygon class=\"face\" points=\"50.0,105.0 214.5,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"105.0\" x2=\"214.5\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"214.5\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"105.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"99.0\">A</text><text class=\"lname\" x=\"224.5\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"132.3\" y=\"218.0\">6√3</text><text class=\"anum\" x=\"36.0\" y=\"158.5\">?</text><text class=\"anum\" x=\"142.3\" y=\"144.5\">?</text><text class=\"alab\" x=\"184.5\" y=\"196.0\" text-anchor=\"middle\">30°</text><path class=\"arc\" d=\"M195.5,189.0 A22,22 0 0 0 192.5,200.0\"/><text class=\"alab\" x=\"60.0\" y=\"129.0\" text-anchor=\"middle\">60°</text><path class=\"arc\" d=\"M69.1,116.0 A22,22 0 0 1 50.0,127.0\"/></svg></div>",
    "parts": [
      {
        "l": "Shorter leg =",
        "t": "num",
        "a": 6,
        "show": "6"
      }
    ],
    "e": [
      "Long leg = short · √3, so short = (long leg) / √3.",
      "short = 6√3 / √3 = <b>6</b>.",
      "Check: if short = 6, then long = 6√3, which matches, and the hypotenuse would be 12."
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "An equilateral triangle has side length 8. What is the length of an altitude?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 320 240\" width=\"320\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"equilateral triangle with altitude\"><polygon class=\"face\" points=\"50.0,210.0 270.0,210.0 160.0,40.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"210.0\" x2=\"270.0\" y2=\"210.0\"/><line class=\"ln-main\" x1=\"270.0\" y1=\"210.0\" x2=\"160.0\" y2=\"40.0\"/><line class=\"ln-main\" x1=\"160.0\" y1=\"40.0\" x2=\"50.0\" y2=\"210.0\"/><line class=\"ln-hid\" x1=\"160.0\" y1=\"40.0\" x2=\"160.0\" y2=\"200.0\"/><path class=\"rmark\" d=\"M160.0,188.0 L172.0,189.1 L172.0,201.1\"/><text class=\"lname\" x=\"36.0\" y=\"226.0\">A</text><text class=\"lname\" x=\"276.0\" y=\"226.0\">B</text><text class=\"lname\" x=\"154.0\" y=\"32.0\">C</text><text class=\"lname\" x=\"168.0\" y=\"192.0\">D</text><text class=\"anum\" x=\"160.0\" y=\"218.0\" text-anchor=\"middle\">8</text><text class=\"anum\" x=\"250.0\" y=\"125.0\">8</text><text class=\"anum\" x=\"58.0\" y=\"125.0\">8</text><text class=\"alab\" x=\"172.0\" y=\"120.0\">?</text><text class=\"alab\" x=\"68.0\" y=\"200.0\">60°</text><path class=\"arc\" d=\"M74.0,210.0 A24,24 0 0 0 63.0,189.9\"/></svg></div>",
    "parts": [
      {
        "l": "Altitude =",
        "t": "mc",
        "a": 2,
        "c": [
          "4",
          "4√2",
          "4√3",
          "8√3"
        ],
        "show": "4√3"
      }
    ],
    "e": [
      "An altitude of an equilateral triangle splits it into two 30°-60°-90° triangles.",
      "The hypotenuse of each is a side of the equilateral triangle (8). The short leg is half the base: 8 / 2 = 4 (this is opposite the 30° angle at A or B).",
      "The altitude is the long leg: 4√3.",
      "In general, the height of an equilateral triangle with side <i>s</i> is (<i>s</i>√3)/2. Here (8√3)/2 = 4√3."
    ]
  },
  {
    "s": "9.2 Special Right Triangles",
    "p": "An isosceles right triangle has a hypotenuse of 16. What is the area of the triangle?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"isosceles right triangle with hypotenuse 16\"><polygon class=\"face\" points=\"50.0,50.0 200.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"50.0\" x2=\"200.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"200.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"50.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"44.0\">A</text><text class=\"lname\" x=\"210.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"135.0\" y=\"117.0\">16</text><text class=\"anum\" x=\"36.0\" y=\"131.0\">?</text><text class=\"anum\" x=\"125.0\" y=\"218.0\">?</text><text class=\"alab\" x=\"58.0\" y=\"72.0\" text-anchor=\"middle\">45°</text><path class=\"arc\" d=\"M65.6,65.6 A22,22 0 0 1 50.0,72.0\"/><text class=\"alab\" x=\"172.0\" y=\"196.0\" text-anchor=\"middle\">45°</text><path class=\"arc\" d=\"M184.4,184.4 A22,22 0 0 0 178.0,200.0\"/></svg></div>",
    "parts": [
      {
        "l": "Area =",
        "t": "num",
        "a": 64,
        "show": "64"
      }
    ],
    "e": [
      "An isosceles right triangle is a 45°-45°-90° triangle, so each leg is hypotenuse / √2 = 16 / √2 = 16√2 / 2 = 8√2.",
      "Area = (1/2) · leg · leg = (1/2) · (8√2) · (8√2) = (1/2) · 64 · 2 = (1/2) · 128 = <b>64</b>.",
      "A shortcut: for a 45°-45°-90° triangle with hypotenuse <i>c</i>, area = <i>c</i>² / 4. Here 256 / 4 = 64.",
      "Don’t use (1/2)·16·16 = 128 — 16 is the hypotenuse, not a leg."
    ]
  },
  {
    "s": "9.3 Geometric Mean",
    "p": "In right triangle <b>ABC</b> with right angle at <b>C</b>, altitude <b>CD</b> is drawn to the hypotenuse <i>AB</i>. If <i>AD</i> = 4 and <i>DB</i> = 9, find <i>CD</i>.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 260\" width=\"360\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with altitude to the hypotenuse\"><polygon class=\"face\" points=\"40.0,220.0 260.0,220.0 107.7,118.5\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"220.0\" x2=\"260.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"260.0\" y1=\"220.0\" x2=\"107.7\" y2=\"118.5\"/><line class=\"ln-main\" x1=\"107.7\" y1=\"118.5\" x2=\"40.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"107.7\" y1=\"118.5\" x2=\"107.7\" y2=\"220.0\"/><path class=\"rmark\" d=\"M101.0,128.4 L111.0,135.1 L117.7,125.1\"/><path class=\"rmark\" d=\"M107.7,208.0 L119.7,208.0 L119.7,220.0\"/><text class=\"lname\" x=\"26.0\" y=\"236.0\">A</text><text class=\"lname\" x=\"266.0\" y=\"236.0\">B</text><text class=\"lname\" x=\"101.7\" y=\"110.5\">C</text><text class=\"lname\" x=\"103.7\" y=\"236.0\">D</text><text class=\"anum\" x=\"73.8\" y=\"236.0\" text-anchor=\"middle\">4</text><text class=\"anum\" x=\"183.8\" y=\"236.0\" text-anchor=\"middle\">9</text><text class=\"alab\" x=\"121.7\" y=\"169.2\">?</text></svg></div>",
    "parts": [
      {
        "l": "CD =",
        "t": "num",
        "a": 6,
        "show": "6"
      }
    ],
    "e": [
      "Geometric Mean (Altitude) Theorem: the altitude to the hypotenuse is the geometric mean of the two segments of the hypotenuse.",
      "That is, <i>CD</i>² = <i>AD</i> · <i>DB</i>.",
      "<i>CD</i>² = 4 · 9 = 36, so <i>CD</i> = √36 = <b>6</b>."
    ]
  },
  {
    "s": "9.3 Geometric Mean",
    "p": "In right triangle <b>ABC</b> with right angle at <b>C</b>, altitude <b>CD</b> is drawn to hypotenuse <i>AB</i>. If <i>AD</i> = 9 and <i>DB</i> = 16, find leg <i>AC</i>.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 260\" width=\"360\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with altitude to the hypotenuse\"><polygon class=\"face\" points=\"40.0,220.0 260.0,220.0 119.2,114.4\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"220.0\" x2=\"260.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"260.0\" y1=\"220.0\" x2=\"119.2\" y2=\"114.4\"/><line class=\"ln-main\" x1=\"119.2\" y1=\"114.4\" x2=\"40.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"119.2\" y1=\"114.4\" x2=\"119.2\" y2=\"220.0\"/><path class=\"rmark\" d=\"M112.0,124.0 L121.6,131.2 L128.8,121.6\"/><path class=\"rmark\" d=\"M119.2,208.0 L131.2,208.0 L131.2,220.0\"/><text class=\"lname\" x=\"26.0\" y=\"236.0\">A</text><text class=\"lname\" x=\"266.0\" y=\"236.0\">B</text><text class=\"lname\" x=\"113.2\" y=\"106.4\">C</text><text class=\"lname\" x=\"115.2\" y=\"236.0\">D</text><text class=\"anum\" x=\"79.6\" y=\"236.0\" text-anchor=\"middle\">9</text><text class=\"anum\" x=\"189.6\" y=\"236.0\" text-anchor=\"middle\">16</text><text class=\"alab\" x=\"63.6\" y=\"167.2\">?</text><text class=\"anum\" x=\"133.2\" y=\"167.2\"></text></svg></div>",
    "parts": [
      {
        "l": "AC =",
        "t": "num",
        "a": 15,
        "show": "15"
      }
    ],
    "e": [
      "Geometric Mean (Leg) Theorem: each leg is the geometric mean of the hypotenuse and the segment of the hypotenuse adjacent to that leg.",
      "For leg <i>AC</i>, the adjacent segment is <i>AD</i>, and the hypotenuse is <i>AB</i> = 9 + 16 = 25.",
      "So <i>AC</i>² = <i>AB</i> · <i>AD</i> = 25 · 9 = 225.",
      "<i>AC</i> = √225 = <b>15</b>.",
      "Check: the other leg would be <i>BC</i>² = 25 · 16 = 400, so <i>BC</i> = 20, and 15² + 20² = 225 + 400 = 625 = 25²."
    ]
  },
  {
    "s": "9.3 Geometric Mean",
    "p": "The altitude to the hypotenuse of a right triangle has length 12 and divides the hypotenuse into two segments. One segment has length 9. Find the length of the other segment.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 260\" width=\"360\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with altitude to the hypotenuse\"><polygon class=\"face\" points=\"40.0,220.0 260.0,220.0 119.2,114.4\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"220.0\" x2=\"260.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"260.0\" y1=\"220.0\" x2=\"119.2\" y2=\"114.4\"/><line class=\"ln-main\" x1=\"119.2\" y1=\"114.4\" x2=\"40.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"119.2\" y1=\"114.4\" x2=\"119.2\" y2=\"220.0\"/><path class=\"rmark\" d=\"M112.0,124.0 L121.6,131.2 L128.8,121.6\"/><path class=\"rmark\" d=\"M119.2,208.0 L131.2,208.0 L131.2,220.0\"/><text class=\"lname\" x=\"26.0\" y=\"236.0\">A</text><text class=\"lname\" x=\"266.0\" y=\"236.0\">B</text><text class=\"lname\" x=\"113.2\" y=\"106.4\">C</text><text class=\"lname\" x=\"115.2\" y=\"236.0\">D</text><text class=\"anum\" x=\"79.6\" y=\"236.0\" text-anchor=\"middle\">9</text><text class=\"alab\" x=\"189.6\" y=\"236.0\" text-anchor=\"middle\">?</text><text class=\"anum\" x=\"133.2\" y=\"167.2\">12</text></svg></div>",
    "parts": [
      {
        "l": "Other segment =",
        "t": "num",
        "a": 16,
        "show": "16"
      }
    ],
    "e": [
      "Altitude theorem: (altitude)² = (segment 1) · (segment 2).",
      "12² = 9 · <i>x</i>, so 144 = 9<i>x</i>.",
      "<i>x</i> = 144 / 9 = <b>16</b>."
    ]
  },
  {
    "s": "9.3 Geometric Mean",
    "p": "A right triangle has legs 9 and 12 and hypotenuse 15. Find the length of the altitude to the hypotenuse.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 260\" width=\"360\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with altitude to the hypotenuse\"><polygon class=\"face\" points=\"40.0,220.0 260.0,220.0 119.2,114.4\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"220.0\" x2=\"260.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"260.0\" y1=\"220.0\" x2=\"119.2\" y2=\"114.4\"/><line class=\"ln-main\" x1=\"119.2\" y1=\"114.4\" x2=\"40.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"119.2\" y1=\"114.4\" x2=\"119.2\" y2=\"220.0\"/><path class=\"rmark\" d=\"M112.0,124.0 L121.6,131.2 L128.8,121.6\"/><path class=\"rmark\" d=\"M119.2,208.0 L131.2,208.0 L131.2,220.0\"/><text class=\"lname\" x=\"26.0\" y=\"236.0\">A</text><text class=\"lname\" x=\"266.0\" y=\"236.0\">B</text><text class=\"lname\" x=\"113.2\" y=\"106.4\">C</text><text class=\"lname\" x=\"115.2\" y=\"236.0\">D</text><text class=\"anum\" x=\"63.6\" y=\"167.2\">9</text><text class=\"anum\" x=\"199.6\" y=\"167.2\">12</text><text class=\"anum\" x=\"150.0\" y=\"252.0\" text-anchor=\"middle\">15</text><text class=\"alab\" x=\"133.2\" y=\"167.2\">?</text></svg></div>",
    "parts": [
      {
        "l": "Altitude to the hypotenuse =",
        "t": "num",
        "a": 7.2,
        "show": "7.2 (or 36/5)"
      }
    ],
    "e": [
      "The area of the triangle can be written two ways: (1/2)·(leg)·(leg) = (1/2)·(hypotenuse)·(altitude to the hypotenuse).",
      "So (1/2)·9·12 = (1/2)·15·<i>h</i>, which gives 54 = 7.5<i>h</i>, and <i>h</i> = 54 / 7.5 = <b>7.2</b>.",
      "Equivalently, <i>h</i> = (leg₁ · leg₂) / hypotenuse = 108 / 15 = 36/5 = 7.2.",
      "Fractions such as 36/5 are accepted."
    ]
  },
  {
    "s": "9.3 Geometric Mean",
    "p": "In right triangle <b>ABC</b> with right angle at <b>C</b>, altitude <b>CD</b> meets hypotenuse <i>AB</i> at <b>D</b>. If <i>AD</i> = 3 and <i>AB</i> = 12, find <i>AC</i>.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 260\" width=\"360\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with altitude to the hypotenuse\"><polygon class=\"face\" points=\"40.0,220.0 260.0,220.0 95.0,124.7\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"220.0\" x2=\"260.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"260.0\" y1=\"220.0\" x2=\"95.0\" y2=\"124.7\"/><line class=\"ln-main\" x1=\"95.0\" y1=\"124.7\" x2=\"40.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"95.0\" y1=\"124.7\" x2=\"95.0\" y2=\"220.0\"/><path class=\"rmark\" d=\"M89.0,135.1 L99.4,141.1 L105.4,130.7\"/><path class=\"rmark\" d=\"M95.0,208.0 L107.0,208.0 L107.0,220.0\"/><text class=\"lname\" x=\"26.0\" y=\"236.0\">A</text><text class=\"lname\" x=\"266.0\" y=\"236.0\">B</text><text class=\"lname\" x=\"89.0\" y=\"116.7\">C</text><text class=\"lname\" x=\"91.0\" y=\"236.0\">D</text><text class=\"anum\" x=\"67.5\" y=\"236.0\" text-anchor=\"middle\">3</text><text class=\"anum\" x=\"177.5\" y=\"236.0\" text-anchor=\"middle\">9</text><text class=\"anum\" x=\"150.0\" y=\"252.0\" text-anchor=\"middle\">AB = 12</text><text class=\"alab\" x=\"51.5\" y=\"172.4\">?</text></svg></div>",
    "parts": [
      {
        "l": "AC =",
        "t": "num",
        "a": 6,
        "show": "6"
      }
    ],
    "e": [
      "Leg theorem: <i>AC</i>² = <i>AB</i> · <i>AD</i> (the hypotenuse times the adjacent segment).",
      "<i>AC</i>² = 12 · 3 = 36, so <i>AC</i> = √36 = <b>6</b>.",
      "Note that <i>DB</i> = 12 − 3 = 9, but you don’t need it to find <i>AC</i>."
    ]
  },
  {
    "s": "9.3 Geometric Mean",
    "p": "The altitude to the hypotenuse of a right triangle is 8 and divides the hypotenuse into segments of lengths 4 and 16. What is the length of the shorter leg?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 260\" width=\"360\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with altitude to the hypotenuse\"><polygon class=\"face\" points=\"40.0,220.0 260.0,220.0 84.0,132.0\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"220.0\" x2=\"260.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"260.0\" y1=\"220.0\" x2=\"84.0\" y2=\"132.0\"/><line class=\"ln-main\" x1=\"84.0\" y1=\"132.0\" x2=\"40.0\" y2=\"220.0\"/><line class=\"ln-main\" x1=\"84.0\" y1=\"132.0\" x2=\"84.0\" y2=\"220.0\"/><path class=\"rmark\" d=\"M78.6,142.7 L89.4,148.1 L94.7,137.4\"/><path class=\"rmark\" d=\"M84.0,208.0 L96.0,208.0 L96.0,220.0\"/><text class=\"lname\" x=\"26.0\" y=\"236.0\">A</text><text class=\"lname\" x=\"266.0\" y=\"236.0\">B</text><text class=\"lname\" x=\"78.0\" y=\"124.0\">C</text><text class=\"lname\" x=\"80.0\" y=\"236.0\">D</text><text class=\"anum\" x=\"62.0\" y=\"236.0\" text-anchor=\"middle\">4</text><text class=\"anum\" x=\"172.0\" y=\"236.0\" text-anchor=\"middle\">16</text><text class=\"anum\" x=\"98.0\" y=\"176.0\">8</text><text class=\"alab\" x=\"46.0\" y=\"176.0\">?</text></svg></div>",
    "parts": [
      {
        "l": "Shorter leg =",
        "t": "mc",
        "a": 2,
        "c": [
          "4√2",
          "8",
          "4√5",
          "√80"
        ],
        "show": "4√5"
      }
    ],
    "e": [
      "The shorter leg is adjacent to the shorter hypotenuse segment (4), so that leg satisfies (leg)² = (hypotenuse) · (adjacent segment).",
      "Hypotenuse = 4 + 16 = 20, so (shorter leg)² = 20 · 4 = 80.",
      "Shorter leg = √80 = √(16·5) = 4√5.",
      "√80 is equal to 4√5, but it is not fully simplified, so the simplified form 4√5 is the expected choice. Check: the longer leg is √(20·16) = √320 = 8√5, and (4√5)² + (8√5)² = 80 + 320 = 400 = 20²."
    ]
  },
  {
    "s": "9.4 Tangent Ratio",
    "p": "In right triangle <b>ABC</b> with right angle at <b>C</b>, <i>AC</i> = 7 and <i>BC</i> = 24. What is tan <i>B</i>?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with legs 7 and 24\"><polygon class=\"face\" points=\"50.0,130.0 290.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"130.0\" x2=\"290.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"290.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"130.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"124.0\">A</text><text class=\"lname\" x=\"300.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"36.0\" y=\"171.0\">7</text><text class=\"anum\" x=\"170.0\" y=\"218.0\">24</text><text class=\"anum\" x=\"180.0\" y=\"157.0\">25</text></svg></div>",
    "parts": [
      {
        "l": "tan B =",
        "t": "mc",
        "a": 1,
        "c": [
          "7/25",
          "7/24",
          "24/7",
          "24/25"
        ],
        "show": "7/24"
      }
    ],
    "e": [
      "SOH-CAH-TOA: tan = opposite / adjacent.",
      "From angle <i>B</i>, the opposite leg is <i>AC</i> = 7 and the adjacent leg is <i>BC</i> = 24.",
      "So tan <i>B</i> = 7/24.",
      "7/25 would be sin <i>B</i> and 24/25 would be cos <i>B</i> (the hypotenuse is 25, since 7-24-25 is a triple). 24/7 is tan <i>A</i>, not tan <i>B</i>."
    ]
  },
  {
    "s": "9.4 Tangent Ratio",
    "p": "From a point 40 feet from the base of a tree, the angle of elevation to the top of the tree is 35°. How tall is the tree? Round to the nearest tenth of a foot.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 240\" width=\"360\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"angle of elevation\"><line class=\"ln-main\" x1=\"30.0\" y1=\"200.0\" x2=\"340.0\" y2=\"200.0\"/><rect x=\"244.0\" y=\"70.0\" width=\"16\" height=\"130.0\" fill=\"#86efac\" stroke=\"#166534\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"60.0\" y1=\"200.0\" x2=\"260.0\" y2=\"70.0\"/><line class=\"ln-hid\" x1=\"60.0\" y1=\"200.0\" x2=\"100.0\" y2=\"200.0\"/><path class=\"arc\" d=\"M92.0,200.0 A32,32 0 0 0 86.8,182.6\"/><circle cx=\"60\" cy=\"200\" r=\"4\" fill=\"#1d4ed8\"/><text class=\"lname\" x=\"56.0\" y=\"216.0\">P</text><text class=\"anum\" x=\"160.0\" y=\"218.0\" text-anchor=\"middle\">40 ft</text><text class=\"alab\" x=\"274.0\" y=\"135.0\">?</text><text class=\"alab\" x=\"98.0\" y=\"188.0\">35°</text></svg></div>",
    "parts": [
      {
        "l": "Height (ft) =",
        "t": "num",
        "a": 28.0,
        "show": "28.0 ft"
      }
    ],
    "e": [
      "The tree is opposite the 35° angle, and the 40 ft walk from the tree is adjacent, so use tangent.",
      "tan 35° = opposite / adjacent = <i>h</i> / 40.",
      "<i>h</i> = 40 tan 35°.",
      "With your calculator in <b>degree</b> mode, tan 35° ≈ 0.7002, so <i>h</i> ≈ 40 × 0.7002 = 28.008…, which rounds to <b>28.0</b> feet."
    ]
  },
  {
    "s": "9.4 Tangent Ratio",
    "p": "A 6-foot-tall person casts a 10-foot shadow. What is the angle of elevation of the sun? Round to the nearest tenth of a degree.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 230\" width=\"360\" height=\"230\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"person and shadow with angle of elevation of the sun\"><line class=\"ln-main\" x1=\"30.0\" y1=\"200.0\" x2=\"340.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"80.0\" y1=\"200.0\" x2=\"80.0\" y2=\"130.0\"/><circle cx=\"80\" cy=\"120\" r=\"10\" fill=\"#1e293b\"/><line class=\"ln-hid\" x1=\"40.0\" y1=\"104.5\" x2=\"190.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"80.0\" y1=\"130.0\" x2=\"190.0\" y2=\"200.0\"/><path class=\"arc\" d=\"M154.0,200.0 A36,36 0 0 1 159.6,180.7\"/><text class=\"anum\" x=\"40.0\" y=\"160.0\">6 ft</text><text class=\"anum\" x=\"135.0\" y=\"218.0\" text-anchor=\"middle\">10 ft</text><text class=\"alab\" x=\"140.0\" y=\"188.0\">?</text><text class=\"anum\" x=\"200.0\" y=\"80.0\">sun</text></svg></div>",
    "parts": [
      {
        "l": "Angle of elevation (°) =",
        "t": "num",
        "a": 31.0,
        "show": "31.0°"
      }
    ],
    "e": [
      "The person’s height is opposite the sun’s angle of elevation, and the shadow is adjacent, so use tangent.",
      "tan θ = 6 / 10 = 0.6.",
      "θ = tan⁻¹(0.6).",
      "In degree mode, tan⁻¹(0.6) ≈ 30.9637…°, which rounds to <b>31.0°</b>."
    ]
  },
  {
    "s": "9.4 Tangent Ratio",
    "p": "From a point 50 meters from the base of a building, the angle of elevation to the top of the building is 42°. How tall is the building? Round to the nearest tenth of a meter.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 240\" width=\"360\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"angle of elevation\"><line class=\"ln-main\" x1=\"30.0\" y1=\"200.0\" x2=\"340.0\" y2=\"200.0\"/><rect x=\"244.0\" y=\"70.0\" width=\"16\" height=\"130.0\" fill=\"#86efac\" stroke=\"#166534\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"60.0\" y1=\"200.0\" x2=\"260.0\" y2=\"70.0\"/><line class=\"ln-hid\" x1=\"60.0\" y1=\"200.0\" x2=\"100.0\" y2=\"200.0\"/><path class=\"arc\" d=\"M92.0,200.0 A32,32 0 0 0 86.8,182.6\"/><circle cx=\"60\" cy=\"200\" r=\"4\" fill=\"#1d4ed8\"/><text class=\"lname\" x=\"56.0\" y=\"216.0\">P</text><text class=\"anum\" x=\"160.0\" y=\"218.0\" text-anchor=\"middle\">50 m</text><text class=\"alab\" x=\"274.0\" y=\"135.0\">?</text><text class=\"alab\" x=\"98.0\" y=\"188.0\">42°</text></svg></div>",
    "parts": [
      {
        "l": "Height (m) =",
        "t": "num",
        "a": 45.0,
        "show": "45.0 m"
      }
    ],
    "e": [
      "tan 42° = <i>h</i> / 50, so <i>h</i> = 50 tan 42°.",
      "tan 42° ≈ 0.9004, so <i>h</i> ≈ 50 × 0.9004 = 45.016…, which rounds to <b>45.0</b> meters."
    ]
  },
  {
    "s": "9.4 Tangent Ratio",
    "p": "A 5.5-foot-tall person stands 20 feet from the base of a streetlight and casts an 8-foot shadow, away from the light. How tall is the streetlight?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 380 250\" width=\"380\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"streetlight, person, and shadow\"><line class=\"ln-main\" x1=\"30.0\" y1=\"210.0\" x2=\"360.0\" y2=\"210.0\"/><rect x=\"52\" y=\"40\" width=\"16\" height=\"170\" fill=\"#64748b\" stroke=\"#1e293b\" stroke-width=\"1.5\"/><circle cx=\"60\" cy=\"40\" r=\"8\" fill=\"#facc15\" stroke=\"#ca8a04\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"210.0\" y1=\"210.0\" x2=\"210.0\" y2=\"140.0\"/><circle cx=\"210\" cy=\"131\" r=\"9\" fill=\"#1e293b\"/><line class=\"ln-main\" x1=\"60.0\" y1=\"40.0\" x2=\"280.0\" y2=\"210.0\"/><text class=\"alab\" x=\"76.0\" y=\"125.0\">h = ?</text><text class=\"anum\" x=\"135.0\" y=\"226.0\" text-anchor=\"middle\">20 ft</text><text class=\"anum\" x=\"245.0\" y=\"226.0\" text-anchor=\"middle\">8 ft</text><text class=\"anum\" x=\"222.0\" y=\"150.0\">5.5 ft</text></svg></div>",
    "parts": [
      {
        "l": "Height of the streetlight (ft) =",
        "t": "num",
        "a": 19.25,
        "show": "19.25 ft"
      }
    ],
    "e": [
      "The light ray just clears the person’s head and hits the ground at the end of the shadow. This makes two similar right triangles (or one large right triangle).",
      "The large triangle has base 20 + 8 = 28 ft and height <i>h</i> (the streetlight). The small triangle (person + shadow) has base 8 ft and height 5.5 ft.",
      "The triangles are similar, so <i>h</i> / 28 = 5.5 / 8.",
      "<i>h</i> = 28 · 5.5 / 8 = 154 / 8 = <b>19.25</b> feet.",
      "You can also use tangent: the angle of elevation of the ray satisfies tan θ = 5.5/8, and also tan θ = <i>h</i>/28, which gives the same equation. 77/4 is accepted."
    ]
  },
  {
    "s": "9.5 Sine &amp; Cosine",
    "p": "In right triangle <b>ABC</b> with right angle at <b>C</b>, the sides are <i>AC</i> = 5, <i>BC</i> = 12, and <i>AB</i> = 13. What is sin <i>B</i>?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"5-12-13 right triangle\"><polygon class=\"face\" points=\"50.0,110.0 266.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"110.0\" x2=\"266.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"266.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"110.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"104.0\">A</text><text class=\"lname\" x=\"276.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"36.0\" y=\"161.0\">5</text><text class=\"anum\" x=\"158.0\" y=\"218.0\">12</text><text class=\"anum\" x=\"168.0\" y=\"147.0\">13</text></svg></div>",
    "parts": [
      {
        "l": "sin B =",
        "t": "mc",
        "a": 1,
        "c": [
          "5/12",
          "5/13",
          "12/13",
          "13/5"
        ],
        "show": "5/13"
      }
    ],
    "e": [
      "SOH-CAH-TOA: sin = opposite / hypotenuse.",
      "From angle <i>B</i>, the opposite side is <i>AC</i> = 5 and the hypotenuse is <i>AB</i> = 13.",
      "So sin <i>B</i> = 5/13.",
      "5/12 is tan <i>B</i>, and 12/13 is cos <i>B</i>."
    ]
  },
  {
    "s": "9.5 Sine &amp; Cosine",
    "p": "Using the same 5-12-13 triangle (right angle at <b>C</b>, <i>AC</i> = 5, <i>BC</i> = 12), what is cos <i>B</i>?",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"5-12-13 right triangle\"><polygon class=\"face\" points=\"50.0,110.0 266.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"110.0\" x2=\"266.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"266.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"110.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"104.0\">A</text><text class=\"lname\" x=\"276.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"36.0\" y=\"161.0\">5</text><text class=\"anum\" x=\"158.0\" y=\"218.0\">12</text><text class=\"anum\" x=\"168.0\" y=\"147.0\">13</text></svg></div>",
    "parts": [
      {
        "l": "cos B =",
        "t": "mc",
        "a": 2,
        "c": [
          "5/12",
          "5/13",
          "12/13",
          "12/5"
        ],
        "show": "12/13"
      }
    ],
    "e": [
      "cos = adjacent / hypotenuse.",
      "From angle <i>B</i>, the adjacent leg is <i>BC</i> = 12 and the hypotenuse is 13.",
      "So cos <i>B</i> = 12/13."
    ]
  },
  {
    "s": "9.5 Sine &amp; Cosine",
    "p": "If sin 37° = cos θ and θ is an acute angle, what is θ?",
    "parts": [
      {
        "l": "θ =",
        "t": "mc",
        "a": 1,
        "c": [
          "37°",
          "53°",
          "63°",
          "143°"
        ],
        "show": "53°"
      }
    ],
    "e": [
      "Sine and cosine of complementary angles are equal: sin θ = cos(90° − θ), and cos θ = sin(90° − θ).",
      "So if sin 37° = cos θ, then θ = 90° − 37° = <b>53°</b>.",
      "Check: 37° + 53° = 90°. Don’t subtract from 180° (that would be 143°, which is not acute) and don’t just copy 37°."
    ]
  },
  {
    "s": "9.5 Sine &amp; Cosine",
    "p": "If sin <i>A</i> = cos 22° and <i>A</i> is acute, find the measure of angle <i>A</i>.",
    "parts": [
      {
        "l": "A (degrees) =",
        "t": "num",
        "a": 68,
        "show": "68°"
      }
    ],
    "e": [
      "sin <i>A</i> = cos 22° = sin(90° − 22°) = sin 68°.",
      "Since <i>A</i> is acute, <i>A</i> = <b>68°</b>.",
      "Equivalently, <i>A</i> and 22° are complementary: <i>A</i> = 90° − 22° = 68°."
    ]
  },
  {
    "s": "9.5 Sine &amp; Cosine",
    "p": "A plane takes off at an angle of 18° with the ground and flies 2,500 feet along its path. What is the plane’s altitude at that moment? Round to the nearest tenth of a foot.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 220\" width=\"360\" height=\"220\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"plane climbing at an angle of 18 degrees\"><line class=\"ln-main\" x1=\"30.0\" y1=\"190.0\" x2=\"340.0\" y2=\"190.0\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"190.0\" x2=\"320.0\" y2=\"100.0\"/><line class=\"ln-hid\" x1=\"320.0\" y1=\"100.0\" x2=\"320.0\" y2=\"190.0\"/><path class=\"rmark\" d=\"M320.0,178.0 L308.0,178.0 L308.0,190.0\"/><path class=\"arc\" d=\"M76.0,190.0 A36,36 0 0 0 74.3,179.0\"/><text class=\"alab\" x=\"84.0\" y=\"180.0\">18°</text><text class=\"anum\" x=\"186.0\" y=\"137.0\">2500 ft</text><text class=\"alab\" x=\"330.0\" y=\"145.0\">?</text><circle cx=\"320\" cy=\"100\" r=\"4\" fill=\"#1d4ed8\"/></svg></div>",
    "parts": [
      {
        "l": "Altitude (ft) =",
        "t": "num",
        "a": 772.5,
        "show": "772.5 ft"
      }
    ],
    "e": [
      "The flight path is the hypotenuse (2,500 ft). The altitude is opposite the 18° takeoff angle, so use sine.",
      "sin 18° = <i>h</i> / 2500, so <i>h</i> = 2500 sin 18°.",
      "sin 18° ≈ 0.30902, so <i>h</i> ≈ 2500 × 0.30902 = 772.542…, which rounds to <b>772.5</b> feet.",
      "Using cosine would give the ground distance, not the altitude."
    ]
  },
  {
    "s": "9.5 Sine &amp; Cosine",
    "p": "A kite string is 120 meters long and makes a 52° angle with the ground. How high is the kite? Round to the nearest tenth of a meter. (Assume the string is straight.)",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"kite on a string at 52 degrees\"><line class=\"ln-main\" x1=\"30.0\" y1=\"210.0\" x2=\"320.0\" y2=\"210.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"210.0\" x2=\"210.0\" y2=\"60.0\"/><line class=\"ln-hid\" x1=\"210.0\" y1=\"60.0\" x2=\"210.0\" y2=\"210.0\"/><path class=\"rmark\" d=\"M210.0,198.0 L198.0,198.0 L198.0,210.0\"/><path class=\"arc\" d=\"M84.0,210.0 A34,34 0 0 0 74.8,186.7\"/><text class=\"alab\" x=\"90.0\" y=\"200.0\">52°</text><text class=\"anum\" x=\"124.0\" y=\"135.0\">120 m</text><text class=\"alab\" x=\"222.0\" y=\"135.0\">?</text><polygon class=\"shape\" points=\"210.0,46.0 220.0,60.0 210.0,74.0 200.0,60.0\"/></svg></div>",
    "parts": [
      {
        "l": "Height (m) =",
        "t": "num",
        "a": 94.6,
        "show": "94.6 m"
      }
    ],
    "e": [
      "The string is the hypotenuse (120 m). The height is opposite 52°, so use sine.",
      "sin 52° = <i>h</i> / 120, so <i>h</i> = 120 sin 52°.",
      "sin 52° ≈ 0.7880, so <i>h</i> ≈ 120 × 0.7880 = 94.561…, which rounds to <b>94.6</b> meters."
    ]
  },
  {
    "s": "9.6 Solving Right Triangles",
    "p": "Solve the right triangle: right angle at <b>C</b>, angle <i>A</i> = 28°, and hypotenuse <i>AB</i> = 20. Round side lengths to the nearest tenth.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with angle A 28 degrees and hypotenuse 20\"><polygon class=\"face\" points=\"50.0,90.0 230.0,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"90.0\" x2=\"230.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"230.0\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"90.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"84.0\">A</text><text class=\"lname\" x=\"240.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"150.0\" y=\"137.0\">20</text><text class=\"anum\" x=\"22.0\" y=\"151.0\">b = ?</text><text class=\"anum\" x=\"140.0\" y=\"218.0\">a = ?</text><text class=\"alab\" x=\"60.0\" y=\"114.0\" text-anchor=\"middle\">28°</text><path class=\"arc\" d=\"M68.8,101.5 A22,22 0 0 1 50.0,112.0\"/></svg></div>",
    "parts": [
      {
        "l": "Angle B (degrees) =",
        "t": "num",
        "a": 62,
        "show": "62°"
      },
      {
        "l": "Side a (opposite 28°) =",
        "t": "num",
        "a": 9.4,
        "show": "9.4"
      },
      {
        "l": "Side b (adjacent to 28°) =",
        "t": "num",
        "a": 17.7,
        "show": "17.7"
      }
    ],
    "e": [
      "The acute angles of a right triangle add to 90°, so angle <i>B</i> = 90° − 28° = <b>62°</b>.",
      "Side <i>a</i> (opposite 28°) : sin 28° = <i>a</i> / 20, so <i>a</i> = 20 sin 28° ≈ 20 × 0.46947 = 9.389…, which rounds to <b>9.4</b>.",
      "Side <i>b</i> (adjacent to 28°) : cos 28° = <i>b</i> / 20, so <i>b</i> = 20 cos 28° ≈ 20 × 0.88295 = 17.659…, which rounds to <b>17.7</b>.",
      "Check with Pythagorean Theorem: 9.4² + 17.7² ≈ 88.36 + 313.29 = 401.65, and 20² = 400 (the small gap is from rounding)."
    ]
  },
  {
    "s": "9.6 Solving Right Triangles",
    "p": "In right triangle <b>ABC</b> with right angle at <b>C</b>, <i>AC</i> = 8 and <i>BC</i> = 15. Find the two acute angles, each rounded to the nearest tenth of a degree.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 240\" width=\"340\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"right triangle with legs 8 and 15\"><polygon class=\"face\" points=\"50.0,110.0 218.8,200.0 50.0,200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"110.0\" x2=\"218.8\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"218.8\" y1=\"200.0\" x2=\"50.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"50.0\" y2=\"110.0\"/><path class=\"rmark\" d=\"M50.0,187.0 L63.0,187.0 L63.0,200.0\"/><text class=\"lname\" x=\"36.0\" y=\"104.0\">A</text><text class=\"lname\" x=\"228.8\" y=\"216.0\">B</text><text class=\"lname\" x=\"34.0\" y=\"216.0\">C</text><text class=\"anum\" x=\"36.0\" y=\"161.0\">8</text><text class=\"anum\" x=\"134.4\" y=\"218.0\">15</text><text class=\"anum\" x=\"144.4\" y=\"147.0\">17</text></svg></div>",
    "parts": [
      {
        "l": "Angle A (opposite 15) =",
        "t": "num",
        "a": 61.9,
        "show": "61.9°"
      },
      {
        "l": "Angle B (opposite 8) =",
        "t": "num",
        "a": 28.1,
        "show": "28.1°"
      }
    ],
    "e": [
      "Use inverse tangent. For angle <i>B</i> (opposite 8, adjacent 15): tan <i>B</i> = 8/15, so <i>B</i> = tan⁻¹(8/15) ≈ 28.0725°, which rounds to <b>28.1°</b>.",
      "For angle <i>A</i> (opposite 15, adjacent 8): tan <i>A</i> = 15/8, so <i>A</i> = tan⁻¹(15/8) ≈ 61.9275°, which rounds to <b>61.9°</b>.",
      "Check: 28.1° + 61.9° = 90°. You only need one inverse trig evaluation; the other acute angle is 90° minus the first.",
      "You could also use sin <i>B</i> = 8/17 or cos <i>B</i> = 15/17, since the hypotenuse is 17."
    ]
  },
  {
    "s": "9.6 Solving Right Triangles",
    "p": "From the top of a 90-foot lighthouse, the angle of depression to a boat is 25°. How far is the boat from the base of the lighthouse? Round to the nearest tenth of a foot.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 380 240\" width=\"380\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"lighthouse and angle of depression to a boat\"><line class=\"ln-main\" x1=\"40.0\" y1=\"200.0\" x2=\"360.0\" y2=\"200.0\"/><rect x=\"68\" y=\"40\" width=\"24\" height=\"160\" fill=\"#cbd5e1\" stroke=\"#334155\" stroke-width=\"1.5\"/><line class=\"ln-hid\" x1=\"80.0\" y1=\"40.0\" x2=\"320.0\" y2=\"40.0\"/><line class=\"ln-main\" x1=\"80.0\" y1=\"40.0\" x2=\"300.0\" y2=\"200.0\"/><path class=\"arc\" d=\"M116.0,40.0 A36,36 0 0 1 109.1,61.2\"/><text class=\"alab\" x=\"130.0\" y=\"62.0\">25°</text><text class=\"anum\" x=\"50.0\" y=\"120.0\">90 ft</text><text class=\"alab\" x=\"190.0\" y=\"218.0\" text-anchor=\"middle\">?</text><circle cx=\"300\" cy=\"200\" r=\"5\" fill=\"#1d4ed8\"/><text class=\"anum\" x=\"290.0\" y=\"216.0\">boat</text></svg></div>",
    "parts": [
      {
        "l": "Distance (ft) =",
        "t": "num",
        "a": 193.0,
        "show": "193.0 ft"
      }
    ],
    "e": [
      "An angle of depression is measured down from the horizontal. By alternate interior angles (the horizontal at the top is parallel to the water), the angle of elevation from the boat to the top is also 25°.",
      "In the right triangle, 90 ft is the opposite side and the distance <i>d</i> from the base is adjacent, so tan 25° = 90 / <i>d</i>.",
      "<i>d</i> = 90 / tan 25°.",
      "tan 25° ≈ 0.4663, so <i>d</i> ≈ 90 / 0.4663 = 193.01…, which rounds to <b>193.0</b> feet.",
      "A common error is to compute 90 tan 25° ≈ 42.0, which would be correct only if 90 were the adjacent side (it is not)."
    ]
  },
  {
    "s": "9.6 Solving Right Triangles",
    "p": "To find the height of a building, you measure an angle of elevation of 32° from point <b>A</b>. Then you walk 50 feet closer, to point <b>B</b>, and the angle of elevation is 48°. How tall is the building? Round to the nearest tenth of a foot.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 400 250\" width=\"400\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"two angles of elevation to the top of a building\"><line class=\"ln-main\" x1=\"40.0\" y1=\"210.0\" x2=\"370.0\" y2=\"210.0\"/><rect x=\"302\" y=\"50\" width=\"18\" height=\"160\" fill=\"#93c5fd\" stroke=\"#1e40af\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"80.0\" y1=\"210.0\" x2=\"320.0\" y2=\"50.0\"/><line class=\"ln-main\" x1=\"170.0\" y1=\"210.0\" x2=\"320.0\" y2=\"50.0\"/><path class=\"arc\" d=\"M114.0,210.0 A34,34 0 0 0 108.3,191.1\"/><path class=\"arc\" d=\"M200.0,210.0 A30,30 0 0 0 190.5,188.1\"/><circle cx=\"80\" cy=\"210\" r=\"4\" fill=\"#1d4ed8\"/><circle cx=\"170\" cy=\"210\" r=\"4\" fill=\"#1d4ed8\"/><text class=\"lname\" x=\"72.0\" y=\"226.0\">A</text><text class=\"lname\" x=\"166.0\" y=\"226.0\">B</text><text class=\"alab\" x=\"108.0\" y=\"198.0\">32°</text><text class=\"alab\" x=\"194.0\" y=\"196.0\">48°</text><text class=\"anum\" x=\"125.0\" y=\"226.0\" text-anchor=\"middle\">50 ft</text><text class=\"anum\" x=\"245.0\" y=\"226.0\" text-anchor=\"middle\">d</text><text class=\"alab\" x=\"332.0\" y=\"130.0\">h = ?</text></svg></div>",
    "parts": [
      {
        "l": "Height (ft) =",
        "t": "num",
        "a": 71.4,
        "show": "71.4 ft"
      }
    ],
    "e": [
      "Let <i>d</i> be the distance (in feet) from the closer point <b>B</b> to the building, and let <i>h</i> be the height.",
      "Then tan 48° = <i>h</i> / <i>d</i>, so <i>h</i> = <i>d</i> tan 48°.",
      "From <b>A</b>, which is 50 ft farther away: tan 32° = <i>h</i> / (<i>d</i> + 50), so <i>h</i> = (<i>d</i> + 50) tan 32°.",
      "Set them equal: <i>d</i> tan 48° = (<i>d</i> + 50) tan 32°.",
      "<i>d</i> tan 48° = <i>d</i> tan 32° + 50 tan 32°.",
      "<i>d</i> (tan 48° − tan 32°) = 50 tan 32°, so <i>d</i> = 50 tan 32° / (tan 48° − tan 32°).",
      "tan 32° ≈ 0.62487 and tan 48° ≈ 1.11061, so <i>d</i> ≈ 31.243 / 0.48574 ≈ 64.32 ft.",
      "Then <i>h</i> = 64.32 tan 48° ≈ 71.436, which rounds to <b>71.4</b> feet.",
      "This is a two-step problem: don’t try to use only one angle and the 50 ft gap as if 50 ft were the adjacent side of a single triangle."
    ]
  },
  {
    "s": "9.6 Solving Right Triangles",
    "p": "A 25-foot ladder leans against a wall and makes a 70° angle with the ground. How high up the wall does the ladder reach, and how far is the base of the ladder from the wall? Round each answer to the nearest tenth of a foot.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 320 250\" width=\"320\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"ladder at 70 degrees to the ground\"><rect x=\"40\" y=\"30\" width=\"30\" height=\"180\" fill=\"#e2e8f0\" stroke=\"#64748b\" stroke-width=\"1.5\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"210.0\" x2=\"300.0\" y2=\"210.0\"/><line class=\"ln-main\" x1=\"70.0\" y1=\"50.0\" x2=\"128.0\" y2=\"210.0\"/><path class=\"rmark\" d=\"M70.0,197.0 L83.0,197.0 L83.0,210.0\"/><path class=\"arc\" d=\"M96.0,210.0 A32,32 0 0 1 117.1,179.9\"/><text class=\"alab\" x=\"88.0\" y=\"198.0\">70°</text><text class=\"anum\" x=\"111.0\" y=\"130.0\">25 ft</text><text class=\"alab\" x=\"44.0\" y=\"130.0\">? ht</text><text class=\"alab\" x=\"99.0\" y=\"226.0\" text-anchor=\"middle\">? base</text></svg></div>",
    "parts": [
      {
        "l": "Height on the wall (ft) =",
        "t": "num",
        "a": 23.5,
        "show": "23.5 ft"
      },
      {
        "l": "Distance from the wall (ft) =",
        "t": "num",
        "a": 8.6,
        "show": "8.6 ft"
      }
    ],
    "e": [
      "The ladder is the hypotenuse (25 ft). The angle with the ground is 70°.",
      "Height (opposite 70°): <i>h</i> = 25 sin 70° ≈ 25 × 0.93969 = 23.492…, which rounds to <b>23.5</b> feet.",
      "Base distance (adjacent to 70°): <i>x</i> = 25 cos 70° ≈ 25 × 0.34202 = 8.550…, which rounds to <b>8.6</b> feet.",
      "Check: 23.5² + 8.6² ≈ 552.25 + 73.96 = 626.21, and 25² = 625 (the difference is from rounding).",
      "Don’t swap sine and cosine: the height is opposite the 70° angle, so sine gives the height."
    ]
  },
  {
    "s": "9.6 Solving Right Triangles",
    "p": "A ramp rises 2.5 feet over a horizontal run of 30 feet. Find the angle of inclination of the ramp and the length of the ramp. Round the angle to the nearest tenth of a degree and the length to the nearest tenth of a foot.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 360 200\" width=\"360\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"wheelchair ramp\"><line class=\"ln-main\" x1=\"30.0\" y1=\"160.0\" x2=\"340.0\" y2=\"160.0\"/><line class=\"ln-main\" x1=\"40.0\" y1=\"160.0\" x2=\"300.0\" y2=\"90.0\"/><line class=\"ln-hid\" x1=\"300.0\" y1=\"90.0\" x2=\"300.0\" y2=\"160.0\"/><path class=\"rmark\" d=\"M300.0,148.0 L288.0,148.0 L288.0,160.0\"/><path class=\"arc\" d=\"M76.0,160.0 A36,36 0 0 0 74.8,150.6\"/><text class=\"alab\" x=\"80.0\" y=\"152.0\">θ = ?</text><text class=\"anum\" x=\"170.0\" y=\"178.0\" text-anchor=\"middle\">run 30 ft</text><text class=\"anum\" x=\"308.0\" y=\"125.0\">2.5 ft</text><text class=\"alab\" x=\"180.0\" y=\"119.0\">L = ?</text></svg></div>",
    "parts": [
      {
        "l": "Angle of inclination (°) =",
        "t": "num",
        "a": 4.8,
        "show": "4.8°"
      },
      {
        "l": "Ramp length (ft) =",
        "t": "num",
        "a": 30.1,
        "show": "30.1 ft"
      }
    ],
    "e": [
      "The rise is opposite the inclination angle θ, and the run is adjacent, so tan θ = 2.5 / 30 = 1/12.",
      "θ = tan⁻¹(2.5/30) ≈ 4.7636°, which rounds to <b>4.8°</b>.",
      "The ramp is the hypotenuse: <i>L</i> = √(30² + 2.5²) = √(900 + 6.25) = √906.25 = <b>30.1</b> feet (exactly 30.104…, which rounds to 30.1).",
      "You could also use <i>L</i> = 30 / cos 4.8° or <i>L</i> = 2.5 / sin 4.8°, but the Pythagorean Theorem is exact and doesn’t depend on the rounded angle."
    ]
  },
  {
    "s": "BONUS 9.7 Law of Sines / Cosines",
    "bonus": true,
    "p": "Bonus (Law of Sines). In △ABC, angle <i>A</i> = 40°, angle <i>B</i> = 60°, and side <i>a</i> (opposite A) = 10. Find side <i>b</i>. Round to the nearest tenth. This is optional and is not part of the 9.1–9.6 score.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 230\" width=\"340\" height=\"230\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"oblique triangle ABC\"><polygon class=\"face\" points=\"50.0,200.0 280.0,200.0 160.0,50.0\"/><line class=\"ln-main\" x1=\"50.0\" y1=\"200.0\" x2=\"280.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"280.0\" y1=\"200.0\" x2=\"160.0\" y2=\"50.0\"/><line class=\"ln-main\" x1=\"160.0\" y1=\"50.0\" x2=\"50.0\" y2=\"200.0\"/><text class=\"lname\" x=\"36.0\" y=\"216.0\">A</text><text class=\"lname\" x=\"286.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"156.0\" y=\"42.0\">C</text><path class=\"arc\" d=\"M76.0,200.0 A26,26 0 0 0 65.4,179.0\"/><text class=\"alab\" x=\"78.0\" y=\"190.0\">40°</text><path class=\"arc\" d=\"M254.0,200.0 A26,26 0 0 1 263.8,179.7\"/><text class=\"alab\" x=\"232.0\" y=\"190.0\">60°</text><text class=\"anum\" x=\"232.0\" y=\"125.0\">a = 10</text><text class=\"anum\" x=\"89.0\" y=\"125.0\">b = ?</text></svg></div>",
    "parts": [
      {
        "l": "Side b =",
        "t": "num",
        "a": 13.5,
        "show": "13.5"
      }
    ],
    "e": [
      "This is not a right triangle (the angles are 40°, 60°, and C = 80°), so you need the Law of Sines, not SOH-CAH-TOA alone.",
      "Law of Sines: <i>a</i> / sin <i>A</i> = <i>b</i> / sin <i>B</i>.",
      "10 / sin 40° = <i>b</i> / sin 60°.",
      "<i>b</i> = 10 · sin 60° / sin 40°.",
      "sin 60° = √3 / 2 ≈ 0.86603 and sin 40° ≈ 0.64279, so <i>b</i> ≈ 10 × 0.86603 / 0.64279 = 13.471…, which rounds to <b>13.5</b>."
    ]
  },
  {
    "s": "BONUS 9.7 Law of Sines / Cosines",
    "bonus": true,
    "p": "Bonus (Law of Cosines). In △ABC, side <i>a</i> = 8, side <i>b</i> = 11, and included angle <i>C</i> = 40°. Find side <i>c</i>. Round to the nearest tenth. This is optional and is not part of the 9.1–9.6 score.",
    "svg": "<div class=\"figwrap\"><svg class=\"fig\" viewBox=\"0 0 340 230\" width=\"340\" height=\"230\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"triangle ABC with SAS data\"><polygon class=\"face\" points=\"60.0,200.0 280.0,200.0 170.0,40.0\"/><line class=\"ln-main\" x1=\"60.0\" y1=\"200.0\" x2=\"280.0\" y2=\"200.0\"/><line class=\"ln-main\" x1=\"280.0\" y1=\"200.0\" x2=\"170.0\" y2=\"40.0\"/><line class=\"ln-main\" x1=\"170.0\" y1=\"40.0\" x2=\"60.0\" y2=\"200.0\"/><text class=\"lname\" x=\"46.0\" y=\"216.0\">A</text><text class=\"lname\" x=\"286.0\" y=\"216.0\">B</text><text class=\"lname\" x=\"166.0\" y=\"32.0\">C</text><path class=\"arc\" d=\"M154.1,63.1 A28,28 0 0 0 185.9,63.1\"/><text class=\"alab\" x=\"162.0\" y=\"76.0\">40°</text><text class=\"anum\" x=\"237.0\" y=\"120.0\">a = 8</text><text class=\"anum\" x=\"87.0\" y=\"120.0\">b = 11</text><text class=\"alab\" x=\"170.0\" y=\"218.0\" text-anchor=\"middle\">c = ?</text></svg></div>",
    "parts": [
      {
        "l": "Side c =",
        "t": "num",
        "a": 7.1,
        "show": "7.1"
      }
    ],
    "e": [
      "This is SAS (two sides and the included angle), so use the Law of Cosines.",
      "<i>c</i>² = <i>a</i>² + <i>b</i>² − 2<i>ab</i> cos <i>C</i>.",
      "<i>c</i>² = 8² + 11² − 2·8·11·cos 40° = 64 + 121 − 176 cos 40°.",
      "cos 40° ≈ 0.76604, so 176 × 0.76604 ≈ 134.824, and <i>c</i>² ≈ 185 − 134.824 = 50.176.",
      "<i>c</i> ≈ √50.176 ≈ 7.083, which rounds to <b>7.1</b>.",
      "Notice <i>c</i> is shorter than both 8 and 11 because angle <i>C</i> is acute; if you forgot the cosine and did 8²+11² you’d get a much larger (wrong) side."
    ]
  },
  {
    "s": "BONUS 9.7 Law of Sines / Cosines",
    "bonus": true,
    "p": "Bonus (Law of Cosines). A triangle has sides 7, 8, and 10. Find the measure of the largest angle, rounded to the nearest tenth of a degree. This is optional and is not part of the 9.1–9.6 score.",
    "parts": [
      {
        "l": "Largest angle (°) =",
        "t": "num",
        "a": 83.3,
        "show": "83.3°"
      }
    ],
    "e": [
      "The largest angle is opposite the longest side (10). This is SSS, so use the Law of Cosines.",
      "cos <i>C</i> = (<i>a</i>² + <i>b</i>² − <i>c</i>²) / (2<i>ab</i>), where <i>c</i> = 10 and the other sides are 7 and 8.",
      "cos <i>C</i> = (7² + 8² − 10²) / (2·7·8) = (49 + 64 − 100) / 112 = 13/112 ≈ 0.11607.",
      "<i>C</i> = cos⁻¹(13/112) ≈ 83.331°, which rounds to <b>83.3°</b>.",
      "Because cos <i>C</i> is positive, the angle is acute (less than 90°), which matches 83.3°. If you subtracted in the wrong order and got a negative cosine, you’d wrongly get an obtuse angle."
    ]
  }
];
