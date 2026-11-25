/* Living Earth Biology Practice Quiz — Cells & Mitosis Test Review Guide.
   Works in the browser (window.BioQ) and in Node (module.exports). No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BioQ = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

/* ------------------------------------------------------------------ RNG */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeRng(seed) {
  const r = mulberry32(seed >>> 0);
  return {
    next: r,
    int(a, b) { return a + Math.floor(r() * (b - a + 1)); },
    pick(arr) { return arr[Math.floor(r() * arr.length)]; },
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        const t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
  };
}

/* ------------------------------------------------------------- BANKS
   Each item: { id, topic, prompt, choices:[correct, wrong, wrong, wrong], explain }
   generateTest shuffles question order and choice order; answer becomes correct index.
   Sources: short-25-question-test.md and full-practice-test.md (Test Review Guide). */

const SHORT_BANK = [
  /* ===== Short Practice Test Q1–21 (MC) + Q22–25 (converted) ===== */
  {
    id: 's1', topic: 'Osmosis & Tonicity',
    prompt: 'A cell is placed in a solution. Water moves into the cell, and the cell swells. What type of solution is the cell in?',
    choices: [
      'Hypotonic',
      'Hypertonic',
      'Isotonic',
      'Saturated'
    ],
    explain: 'In a hypotonic solution (fewer solutes outside), water moves into the cell and it swells.'
  },
  {
    id: 's2', topic: 'Osmosis & Tonicity',
    prompt: 'In an isotonic solution, what happens to the water?',
    choices: [
      'Water moves in and out at equal rates, so there is no net change',
      'Water only moves into the cell',
      'Water only moves out of the cell',
      'Water stops moving completely'
    ],
    explain: 'Isotonic means equal concentrations inside and out, so there is no net water movement.'
  },
  {
    id: 's3', topic: 'Osmosis & Tonicity',
    prompt: 'A plant cell is placed in very salty (hypertonic) water. What happens?',
    choices: [
      'Water leaves the cell, and the cell membrane pulls away from the cell wall',
      'Water enters the cell, and the cell bursts',
      'Salt leaves the cell',
      'Nothing happens because of the cell wall'
    ],
    explain: 'Water leaves the cell and the membrane pulls away from the wall (plasmolysis).'
  },
  {
    id: 's4', topic: 'Osmosis & Tonicity',
    prompt: 'Osmosis is the diffusion of:',
    choices: [
      'Water across a selectively permeable membrane',
      'Glucose across a membrane',
      'Proteins out of the cell',
      'Any molecule that uses energy'
    ],
    explain: 'Osmosis is specifically the diffusion of water across a selectively permeable membrane.'
  },
  {
    id: 's5', topic: 'Transport',
    prompt: 'Which process moves molecules from high to low concentration through a protein channel or carrier with no energy?',
    choices: [
      'Facilitated diffusion',
      'Active transport',
      'Simple diffusion',
      'Exocytosis'
    ],
    explain: 'Facilitated diffusion is passive (no ATP) and uses a membrane protein.'
  },
  {
    id: 's6', topic: 'Transport',
    prompt: 'Which process requires energy (ATP) to move molecules against their concentration gradient?',
    choices: [
      'Active transport',
      'Osmosis',
      'Diffusion',
      'Facilitated diffusion'
    ],
    explain: 'Active transport moves molecules against the gradient and uses ATP.'
  },
  {
    id: 's7', topic: 'Endo/Exocytosis',
    prompt: 'A cell releases hormones by fusing a vesicle with the cell membrane. What is this process called?',
    choices: [
      'Exocytosis',
      'Endocytosis',
      'Pinocytosis',
      'Osmosis'
    ],
    explain: 'Exocytosis releases materials out of the cell when a vesicle fuses with the membrane.'
  },
  {
    id: 's8', topic: 'Endo/Exocytosis',
    prompt: '"Cell drinking," in which a cell takes in small droplets of liquid, is called:',
    choices: [
      'Pinocytosis',
      'Phagocytosis',
      'Exocytosis',
      'Facilitated diffusion'
    ],
    explain: 'Pinocytosis means "cell drinking." Phagocytosis means "cell eating."'
  },
  {
    id: 's9', topic: 'Cell Membrane',
    prompt: 'A phospholipid has a hydrophilic head and hydrophobic tails. In the cell membrane, the tails:',
    choices: [
      'Point inward toward each other, away from water',
      'Point toward the water outside the cell',
      'Point toward the cytoplasm',
      'Are attached to the cell wall'
    ],
    explain: 'The hydrophobic tails face inward, away from water, forming the bilayer core.'
  },
  {
    id: 's10', topic: 'Cell Membrane',
    prompt: 'Which molecule would need help from a membrane protein to cross the cell membrane?',
    choices: [
      'Glucose',
      'Oxygen (O₂)',
      'Carbon dioxide (CO₂)',
      'None of these, because all molecules pass freely'
    ],
    explain: 'Glucose is too large and polar to cross alone, so it needs a carrier protein (facilitated diffusion).'
  },
  {
    id: 's11', topic: 'Prokaryotes & Eukaryotes',
    prompt: 'Which feature do prokaryotes have that eukaryotes also have?',
    choices: [
      'Ribosomes and a cell membrane',
      'A nucleus',
      'Mitochondria',
      'Endoplasmic reticulum'
    ],
    explain: 'All cells have ribosomes, a cell membrane, cytoplasm, and DNA.'
  },
  {
    id: 's12', topic: 'Prokaryotes & Eukaryotes',
    prompt: 'Bacteria are classified as prokaryotes because they:',
    choices: [
      'Have no nucleus or membrane-bound organelles',
      'Are multicellular',
      'Have chloroplasts',
      'Have no DNA'
    ],
    explain: 'Prokaryotes have no nucleus and no membrane-bound organelles.'
  },
  {
    id: 's13', topic: 'Organelles',
    prompt: 'A cell has a rigid boxy shape, a cell wall, and green chloroplasts. What type of cell is it?',
    choices: [
      'A plant cell',
      'An animal cell',
      'A bacterium (prokaryote) with no organelles',
      'A red blood cell'
    ],
    explain: 'A cell wall, boxy shape, and chloroplasts indicate a plant cell.'
  },
  {
    id: 's14', topic: 'Organelles',
    prompt: 'Which structure would you find in an animal cell but not usually in a plant cell?',
    choices: [
      'Lysosome',
      'Cell wall',
      'Large central vacuole',
      'Chloroplast'
    ],
    explain: 'Lysosomes are mainly found in animal cells; plant cells have walls, chloroplasts, and a large vacuole.'
  },
  {
    id: 's15', topic: 'Microscope',
    prompt: 'Through a compound microscope, a specimen appears at the upper right of the field of view. To move it to the center, which way should you move the slide?',
    choices: [
      'Upper right',
      'Lower left',
      'Upper left',
      'Lower right'
    ],
    explain: 'The image is inverted, so you move the slide in the same direction the image appears (upper right).'
  },
  {
    id: 's16', topic: 'Microscope',
    prompt: 'A compound microscope has a 10x ocular. The objectives are 4x, 10x, and 40x. Which total magnification gives the largest field of view?',
    choices: [
      '40x',
      '100x',
      '400x',
      '4,000x'
    ],
    explain: 'The lowest power (4x × 10x = 40x) has the largest field of view.'
  },
  {
    id: 's17', topic: 'SA:V & Cell Size',
    prompt: 'As a cell gets bigger, its surface area-to-volume ratio:',
    choices: [
      'Decreases',
      'Increases',
      'Stays the same',
      'Doubles'
    ],
    explain: 'Volume grows faster than surface area, so the SA:V ratio decreases as a cell enlarges.'
  },
  {
    id: 's18', topic: 'Cell Membrane',
    prompt: 'Why can small molecules like oxygen cross a cell membrane more easily than large molecules like starch?',
    choices: [
      'The membrane is selectively permeable: small nonpolar molecules pass more easily than large ones',
      'Starch is destroyed by the phospholipid heads before it can enter',
      'Oxygen uses ATP pumps while starch uses osmosis',
      'Large molecules always move faster because they have more mass'
    ],
    explain: 'Selectively permeable membranes let small nonpolar molecules pass more readily; large molecules need proteins or vesicles.'
  },
  {
    id: 's19', topic: 'Mitosis & Cell Cycle',
    prompt: 'During which phase of mitosis are the sister chromatids pulled apart to opposite ends of the cell?',
    choices: [
      'Anaphase',
      'Prophase',
      'Metaphase',
      'Telophase'
    ],
    explain: 'In anaphase, sister chromatids separate ("A" for apart).'
  },
  {
    id: 's20', topic: 'Mitosis & Cell Cycle',
    prompt: 'How is cytokinesis different in plant cells?',
    choices: [
      'Plant cells form a cell plate that becomes the new cell wall',
      'Plant cells form a cleavage furrow',
      'Plant cells do not undergo cytokinesis',
      'Plant cells divide their nucleus twice'
    ],
    explain: 'Plant cells form a cell plate because the rigid cell wall cannot pinch in.'
  },
  {
    id: 's21', topic: 'Stem Cells & Cancer',
    prompt: 'Which statement best describes stem cells?',
    choices: [
      'They are unspecialized cells that can differentiate into specialized cell types',
      'They are fully specialized cells that cannot divide',
      'They are only found in plants',
      'They are cancer cells'
    ],
    explain: 'Stem cells are unspecialized and can differentiate into specialized types.'
  },
  {
    id: 's22', topic: 'Mitosis & Cell Cycle',
    prompt: 'The longest phase of the cell cycle, when the cell grows and copies its DNA, is called:',
    choices: [
      'Interphase',
      'Prophase',
      'Metaphase',
      'Cytokinesis'
    ],
    explain: 'Interphase (G1, S, and G2) is the longest phase; the cell grows and copies DNA.'
  },
  {
    id: 's23', topic: 'Stem Cells & Cancer',
    prompt: 'Which statement best explains what cancer is?',
    choices: [
      'Uncontrolled cell division that happens when cells ignore the signals that normally regulate the cell cycle',
      'A process in which healthy cells permanently stop dividing',
      'Normal cell specialization during embryonic development',
      'The fusion of two gametes to form a zygote'
    ],
    explain: 'Cancer is uncontrolled cell division when cells ignore normal cell-cycle regulation signals.'
  },
  {
    id: 's24', topic: 'SA:V & Cell Size',
    prompt: 'A cube-shaped cell is 3 cm on each side. What is its SA:V ratio? (SA = 6 × side², V = side³)',
    choices: [
      '2:1',
      '1:2',
      '3:1',
      '6:1'
    ],
    explain: 'SA = 6 × 9 = 54 cm², V = 27 cm³, so SA:V = 54:27 = 2:1.'
  },
  {
    id: 's25', topic: 'Mitosis & Cell Cycle',
    prompt: 'During which phase of mitosis do chromosomes become visible as condensed X-shaped structures and the nuclear envelope breaks down?',
    choices: [
      'Prophase',
      'Metaphase',
      'Anaphase',
      'Telophase'
    ],
    explain: 'In prophase, chromatin condenses into visible chromosomes and the nuclear envelope breaks down.'
  }
];

const FULL_BANK = [
  /* ===== Full Practice Test Part A (1–20) ===== */
  {
    id: 'f1', topic: 'Microscope',
    prompt: 'A microscope has a 10x ocular (eyepiece) lens. What is the total magnification when the 40x objective is in place?',
    choices: [
      '400x',
      '50x',
      '40x',
      '4,000x'
    ],
    explain: '10x × 40x = 400x. Multiply the ocular and objective magnifications.'
  },
  {
    id: 'f2', topic: 'Microscope',
    prompt: 'You place a slide with the letter "e" right-side up on the stage. How will the letter look through the microscope?',
    choices: [
      'Upside down and backwards',
      'Exactly the same as on the slide',
      'Backwards only',
      'Much smaller than on the slide'
    ],
    explain: 'The lenses invert the image, so it appears upside down and backwards (left-right reversed).'
  },
  {
    id: 'f3', topic: 'Microscope',
    prompt: 'You switch from low power (40x) to high power (400x). What happens to the field of view?',
    choices: [
      'It gets smaller, and you see less of the specimen, but in more detail',
      'It gets larger, and you see more of the specimen',
      'It stays the same size',
      'It disappears completely'
    ],
    explain: 'Higher magnification gives a smaller field of view with more detail.'
  },
  {
    id: 'f4', topic: 'Microscope',
    prompt: 'Which rule for using a microscope is correct?',
    choices: [
      'Start focusing on the lowest power objective, and use only the fine adjustment knob on high power',
      'Use the coarse adjustment knob on high power',
      'Carry the microscope with one hand by the eyepiece',
      'Clean the lenses with a paper towel'
    ],
    explain: 'Start on low power. On high power, use only the fine adjustment so you do not crack the slide or lens.'
  },
  {
    id: 'f5', topic: 'Microscope',
    prompt: 'Which part of the microscope controls how much light passes through the specimen?',
    choices: [
      'Diaphragm',
      'Stage clips',
      'Revolving nosepiece',
      'Arm'
    ],
    explain: 'The diaphragm adjusts the amount of light reaching the specimen.'
  },
  {
    id: 'f6', topic: 'Prokaryotes & Eukaryotes',
    prompt: 'Which statement correctly compares prokaryotes and eukaryotes?',
    choices: [
      'Prokaryotes have no nucleus or membrane-bound organelles, and eukaryotes have both',
      'Only prokaryotes have DNA',
      'Eukaryotes have no ribosomes',
      'Prokaryotes are always larger than eukaryotes'
    ],
    explain: 'Prokaryotes lack a nucleus and membrane-bound organelles; eukaryotes have both.'
  },
  {
    id: 'f7', topic: 'Prokaryotes & Eukaryotes',
    prompt: 'Which structure is found in both prokaryotic and eukaryotic cells?',
    choices: [
      'Ribosomes',
      'Nucleus',
      'Mitochondria',
      'Golgi apparatus'
    ],
    explain: 'All cells have ribosomes (along with a cell membrane, cytoplasm, and DNA).'
  },
  {
    id: 'f8', topic: 'Organelles',
    prompt: 'Which organelle releases energy (makes ATP) from food through cellular respiration?',
    choices: [
      'Mitochondrion',
      'Chloroplast',
      'Lysosome',
      'Vacuole'
    ],
    explain: 'Mitochondria carry out cellular respiration and make ATP.'
  },
  {
    id: 'f9', topic: 'Organelles',
    prompt: 'Which organelle modifies, sorts, and packages proteins before they are shipped out of the cell?',
    choices: [
      'Golgi apparatus',
      'Ribosome',
      'Nucleus',
      'Cell wall'
    ],
    explain: 'The Golgi apparatus modifies, sorts, and packages proteins.'
  },
  {
    id: 'f10', topic: 'Organelles',
    prompt: 'Muscle cells need a lot of energy. Which organelle would you expect muscle cells to have many of?',
    choices: [
      'Mitochondria',
      'Chloroplasts',
      'Cell walls',
      'Large central vacuoles'
    ],
    explain: 'High energy needs require many mitochondria.'
  },
  {
    id: 'f11', topic: 'Cell Membrane',
    prompt: 'The cell membrane is mainly made of a phospholipid bilayer. How are the phospholipids arranged?',
    choices: [
      'Hydrophilic (water-loving) heads face the watery inside and outside of the cell, and hydrophobic tails face inward, away from water',
      'Hydrophobic (water-fearing) heads face outward and hydrophilic tails face inward',
      'All tails face the outside of the cell',
      'The phospholipids are arranged randomly'
    ],
    explain: 'Hydrophilic heads face water; hydrophobic tails hide inside the bilayer.'
  },
  {
    id: 'f12', topic: 'Cell Membrane',
    prompt: 'Which molecules can pass most easily straight through the phospholipid bilayer?',
    choices: [
      'Small, nonpolar molecules such as oxygen (O₂) and carbon dioxide (CO₂)',
      'Large molecules such as starch',
      'Charged ions such as Na⁺',
      'Large proteins'
    ],
    explain: 'Small nonpolar molecules slip between the phospholipids. Ions and large molecules need proteins or vesicles.'
  },
  {
    id: 'f13', topic: 'Osmosis & Tonicity',
    prompt: 'A red blood cell is placed in distilled (pure) water. What will happen?',
    choices: [
      'Water moves in, and the cell swells and may burst',
      'Water moves out, and the cell shrinks',
      'Nothing, because the solution is isotonic',
      'Salt moves into the cell'
    ],
    explain: 'Distilled water is hypotonic to the cell, so water rushes in and the cell can burst (lyse).'
  },
  {
    id: 'f14', topic: 'Osmosis & Tonicity',
    prompt: 'A solution that has a higher solute concentration than the inside of the cell is called:',
    choices: [
      'Hypertonic',
      'Hypotonic',
      'Isotonic',
      'Equilibrium'
    ],
    explain: 'Hypertonic means a higher solute concentration outside the cell.'
  },
  {
    id: 'f15', topic: 'Transport',
    prompt: 'Glucose moves into a cell from high concentration to low concentration through a carrier protein, without using energy. What is this process called?',
    choices: [
      'Facilitated diffusion',
      'Active transport',
      'Exocytosis',
      'Phagocytosis'
    ],
    explain: 'Facilitated diffusion moves molecules down the gradient through a protein, with no energy.'
  },
  {
    id: 'f16', topic: 'Transport',
    prompt: 'A cell pumps sodium ions from low to high concentration. Which statement is true about this process?',
    choices: [
      'It is active transport and needs energy (ATP)',
      'It is simple diffusion and needs no energy',
      'It is osmosis',
      'It is facilitated diffusion'
    ],
    explain: 'Moving molecules against the gradient is active transport, which requires ATP.'
  },
  {
    id: 'f17', topic: 'Endo/Exocytosis',
    prompt: 'A white blood cell surrounds and engulfs a bacterium. What is this process called?',
    choices: [
      'Phagocytosis ("cell eating")',
      'Pinocytosis',
      'Exocytosis',
      'Osmosis'
    ],
    explain: 'Phagocytosis means "cell eating," the engulfing of large particles.'
  },
  {
    id: 'f18', topic: 'Transport',
    prompt: 'Which change would increase the rate of diffusion?',
    choices: [
      'Raising the temperature',
      'Lowering the temperature',
      'Making the concentration gradient smaller',
      'Using larger molecules'
    ],
    explain: 'Higher temperature makes molecules move faster. A larger gradient and smaller molecules also speed diffusion.'
  },
  {
    id: 'f19', topic: 'Mitosis & Cell Cycle',
    prompt: 'During which phase of mitosis do the chromosomes line up in the middle (equator) of the cell?',
    choices: [
      'Metaphase',
      'Prophase',
      'Anaphase',
      'Telophase'
    ],
    explain: 'Metaphase: chromosomes line up in the middle.'
  },
  {
    id: 'f20', topic: 'Mitosis & Cell Cycle',
    prompt: 'Which phase of the cell cycle is the longest?',
    choices: [
      'Interphase',
      'Prophase',
      'Anaphase',
      'Cytokinesis'
    ],
    explain: 'Interphase (G1, S, and G2) is the longest phase; the cell grows and copies its DNA.'
  },

  /* ===== Part B/C converted to MC (practical single best-answer items) ===== */
  {
    id: 'f21', topic: 'SA:V & Cell Size',
    prompt: 'Cell X is a 2 cm cube and Cell Y is a 4 cm cube. What is the SA:V ratio of Cell X? (SA = 6 × side², V = side³)',
    choices: [
      '3:1',
      '1.5:1',
      '2:1',
      '6:1'
    ],
    explain: 'Cell X: SA = 24 cm², V = 8 cm³, SA:V = 3:1. (Cell Y is 1.5:1.)'
  },
  {
    id: 'f22', topic: 'SA:V & Cell Size',
    prompt: 'As a cell grows, which increases faster, and why must cells stay small?',
    choices: [
      'Volume increases faster; a low SA:V ratio makes nutrient/waste exchange too slow, so cells divide to restore a high ratio',
      'Surface area increases faster; cells stay small only to save DNA',
      'Both increase at the same rate; cell size does not matter for diffusion',
      'Volume decreases as cells grow; cells stay small to avoid mitosis'
    ],
    explain: 'Volume is cubed while SA is squared, so SA:V falls. Diffusion becomes too slow for a large volume; dividing restores a high SA:V.'
  },
  {
    id: 'f23', topic: 'Cell Membrane',
    prompt: 'A selectively permeable membrane separates a side with many small solute molecules from a side with few. Water and the small solutes can cross; large polymers cannot. What happens over time?',
    choices: [
      'Small solutes diffuse toward lower concentration, and water moves by osmosis toward the higher solute side',
      'Only large polymers move until both sides are identical',
      'Nothing moves because the membrane blocks all traffic',
      'Water and solutes both require ATP to cross in either direction'
    ],
    explain: 'Diffusion moves solutes down their gradient; osmosis moves water toward the higher solute concentration across a selectively permeable membrane.'
  },
  {
    id: 'f24', topic: 'Cell Membrane',
    prompt: 'Which statement best explains selective permeability of the cell membrane?',
    choices: [
      'Some substances can cross more easily than others based on size, polarity, and whether membrane proteins help them',
      'Every molecule crosses at the same rate with no exceptions',
      'Only water can ever enter or leave a living cell',
      'The membrane lets starch through freely but blocks oxygen'
    ],
    explain: 'Selective permeability depends on size, charge/polarity, and protein helpers (channels, carriers, pumps).'
  },
  {
    id: 'f25', topic: 'Osmosis & Tonicity',
    prompt: 'A plant cell with a high concentration of dissolved sugars inside is surrounded by distilled water. What happens?',
    choices: [
      'Water enters by osmosis, the vacuole fills, and the cell becomes turgid (firm)',
      'Water leaves and the cell plasmolyzes immediately',
      'Sugar leaves until the outside is hypertonic',
      'Nothing happens because plant cells never take in water'
    ],
    explain: 'Distilled water is hypotonic to the cell; water enters by osmosis and turgor pressure rises against the cell wall.'
  },
  {
    id: 'f26', topic: 'Endo/Exocytosis',
    prompt: 'How does pinocytosis differ from phagocytosis?',
    choices: [
      'Pinocytosis takes in droplets of liquid ("cell drinking"); phagocytosis engulfs large particles or cells ("cell eating")',
      'Pinocytosis releases hormones; phagocytosis is osmosis of salt',
      'Phagocytosis is passive; pinocytosis always moves molecules against their gradient',
      'They are the same process under two different names'
    ],
    explain: 'Both are forms of endocytosis: pinocytosis = liquid droplets; phagocytosis = large solids/cells.'
  },
  {
    id: 'f27', topic: 'Transport',
    prompt: 'Which statement correctly contrasts diffusion and osmosis?',
    choices: [
      'Diffusion is movement of any molecules from high to low concentration; osmosis is the diffusion of water across a selectively permeable membrane',
      'Osmosis always requires ATP; diffusion never needs a membrane',
      'Diffusion only moves water; osmosis only moves salt',
      'Osmosis moves molecules against their gradient; diffusion moves them with the gradient'
    ],
    explain: 'Osmosis is a special case of diffusion: water across a selectively permeable membrane.'
  },
  {
    id: 'f28', topic: 'Endo/Exocytosis',
    prompt: 'Which statement correctly describes endocytosis and exocytosis?',
    choices: [
      'Endocytosis brings materials in via vesicles; exocytosis releases materials out when a vesicle fuses with the membrane',
      'Endocytosis releases hormones; exocytosis engulfs bacteria',
      'Both move molecules through protein channels without energy',
      'Exocytosis is passive; endocytosis is osmosis of solids'
    ],
    explain: 'Endocytosis = into the cell (phagocytosis / pinocytosis); exocytosis = out of the cell. Both use vesicles and energy.'
  },
  {
    id: 'f29', topic: 'Mitosis & Cell Cycle',
    prompt: 'How does cytokinesis differ in animal cells versus plant cells?',
    choices: [
      'Animal cells form a cleavage furrow; plant cells form a cell plate that becomes a new cell wall (because the wall cannot pinch in)',
      'Plant cells form a cleavage furrow; animal cells form a cell plate',
      'Only animal cells undergo cytokinesis',
      'Both use a cell plate made of cellulose'
    ],
    explain: 'Animal cells pinch with a cleavage furrow. Plant cells build a cell plate because of their rigid wall.'
  },
  {
    id: 'f30', topic: 'Stem Cells & Cancer',
    prompt: 'What is cancer, in terms of cell-cycle regulation?',
    choices: [
      'Uncontrolled cell division when cells ignore normal signals (checkpoints, growth factors, contact inhibition) that regulate the cell cycle',
      'Normal differentiation of stem cells into specialized tissues',
      'A temporary pause in mitosis during interphase',
      'The formation of a cell plate in animal cells'
    ],
    explain: 'Cancer is uncontrolled division, often from mutations in genes that control checkpoints and growth signals.'
  },
  {
    id: 'f31', topic: 'Stem Cells & Cancer',
    prompt: 'What are stem cells, and how do they relate to differentiation?',
    choices: [
      'Unspecialized cells that can divide and differentiate into specialized cell types',
      'Fully specialized cells that never divide',
      'Cancer cells that ignore contact inhibition',
      'Only plant cells with chloroplasts'
    ],
    explain: 'Stem cells are unspecialized; differentiation turns on genes so a cell becomes specialized for one job.'
  },
  {
    id: 'f32', topic: 'Organelles',
    prompt: 'Which organelle contains DNA and controls cell activities, and is found in both plant and animal cells?',
    choices: [
      'Nucleus',
      'Chloroplast',
      'Cell wall',
      'Lysosome'
    ],
    explain: 'The nucleus (both plant and animal) contains DNA and controls cell activities.'
  },
  {
    id: 'f33', topic: 'Organelles',
    prompt: 'Which difference correctly contrasts typical plant cells and animal cells?',
    choices: [
      'Plant cells have a cell wall and often chloroplasts / a large central vacuole; animal cells are rounder with only a cell membrane',
      'Animal cells have chloroplasts; plant cells never have vacuoles',
      'Plant cells lack a nucleus; animal cells have a cell wall',
      'Plant and animal cells have identical organelles and outer coverings'
    ],
    explain: 'Plant cells have walls, often chloroplasts, and a large central vacuole; animal cells lack those and are bounded only by a membrane.'
  },
  {
    id: 'f34', topic: 'Osmosis & Tonicity',
    prompt: 'A red blood cell is placed in very salty water and shrivels. The solution outside the cell is:',
    choices: [
      'Hypertonic, and water moves out of the cell',
      'Hypotonic, and water moves into the cell',
      'Isotonic, with no net water movement',
      'Hypotonic, and salt moves into the cell'
    ],
    explain: 'Salty water is hypertonic; water leaves and the cell shrivels.'
  },
  {
    id: 'f35', topic: 'Mitosis & Cell Cycle',
    prompt: 'Which is the correct order of cell-cycle / mitosis phases, starting with DNA being copied as chromatin?',
    choices: [
      'Interphase → Prophase → Metaphase → Anaphase → Telophase',
      'Prophase → Interphase → Anaphase → Metaphase → Telophase',
      'Metaphase → Prophase → Telophase → Anaphase → Interphase',
      'Anaphase → Telophase → Metaphase → Prophase → Interphase'
    ],
    explain: 'Interphase (DNA copied) → prophase (condense) → metaphase (middle) → anaphase (apart) → telophase (two nuclei).'
  }
];

/* -------------------------------------------------------- generateTest */
function bankFor(mode) {
  return mode === 'full' ? FULL_BANK : SHORT_BANK;
}

function generateTest(seed, mode) {
  mode = mode === 'full' ? 'full' : 'short';
  const BANK = bankFor(mode);
  const R = makeRng((seed >>> 0) || 1);
  const order = R.shuffle(BANK.map((_, i) => i));
  return order.map((bi, n) => {
    const q = BANK[bi];
    const idxs = R.shuffle([0, 1, 2, 3]);
    const choices = idxs.map(i => q.choices[i]);
    const answer = idxs.indexOf(0); // 0 was the correct choice in the bank
    return {
      id: q.id,
      topic: q.topic,
      prompt: q.prompt,
      choices: choices,
      answer: answer,
      explain: q.explain,
      n: n + 1,
      mode: mode
    };
  });
}

function topicCounts(mode) {
  const c = {};
  bankFor(mode).forEach(q => { c[q.topic] = (c[q.topic] || 0) + 1; });
  return c;
}

return {
  generateTest: generateTest,
  topicCounts: topicCounts,
  bankFor: bankFor,
  SHORT_SIZE: SHORT_BANK.length,
  FULL_SIZE: FULL_BANK.length,
  BANK_SIZE: SHORT_BANK.length,
  TOPICS: Object.keys(topicCounts('short')),
  FULL_TOPICS: Object.keys(topicCounts('full')),
  makeRng: makeRng
};
});
