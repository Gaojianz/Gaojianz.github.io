// Health Nutrition Test practice — rebuilt from Classroom unit PDFs.
// All questions are 4-option multiple choice. Only a few calorie-math items.
window.HEALTH_QUESTIONS = [
  {
    "topic": "Chronic Disease",
    "source": "Nutrition & Health",
    "q": "The Nutrition & Health reading says the five main chronic diseases you should know about are:",
    "choices": [
      "Asthma, flu, strep throat, anemia, and scurvy",
      "Heart disease, high blood pressure, type 2 diabetes, cancer, and osteoporosis",
      "Rickets, scurvy, beriberi, pellagra, and goiter",
      "Depression, insomnia, migraines, allergies, and acid reflux"
    ],
    "answer": 1,
    "explain": "The five listed are heart disease, high blood pressure (hypertension), type 2 diabetes, cancer, and osteoporosis. The reading also names lack of physical activity, poor nutrition, tobacco use, and drinking too much alcohol as main behavior choices that lead to common chronic diseases. From: Nutrition & Health."
  },
  {
    "topic": "Obesity",
    "source": "Obesity slides",
    "q": "According to the Obesity slides, about how many American children are overweight or obese?",
    "choices": [
      "1 out of 10",
      "1 out of 3",
      "2 out of 3",
      "1 out of 20"
    ],
    "answer": 1,
    "explain": "The slides say 1 out of 3 American children are either overweight or obese. They also note more than a 100% increase in obese children since the late 1990s and over a 200% increase in teen obesity. From: Obesity slides."
  },
  {
    "topic": "Obesity",
    "source": "Obesity slides",
    "q": "On any given day, according to the Obesity slides, about what percent of U.S. kids are eating fast food?",
    "choices": [
      "10%",
      "20%",
      "33%",
      "75%"
    ],
    "answer": 2,
    "explain": "The slides ask 'Poor Nutrition: What Is It Costing Our Kids?' and state that on any given day, 33 percent of U.S. kids are eating fast food. From: Obesity slides."
  },
  {
    "topic": "Obesity",
    "source": "Obesity slides",
    "q": "According to the Obesity slides, about 40% of the calories adolescents consume are 'empty' calories coming from:",
    "choices": [
      "Chicken, rice, milk, and apples",
      "Soda, desserts, fruit drinks, pizza, and whole milk",
      "Vegetables, whole grains, and water",
      "Eggs, beans, nuts, and yogurt only"
    ],
    "answer": 1,
    "explain": "The Adolescent Eating Behaviors slide says 40% of the calories they consume are empty, coming from soda, desserts, fruit drinks, pizza, and whole milk. It also says most U.S. youth drink more soda per day than water. From: Obesity slides."
  },
  {
    "topic": "Carbohydrates",
    "source": "Essential Nutrients handout",
    "q": "Glycogen, a complex carbohydrate, is a special form of starch that can be stored in the:",
    "choices": [
      "Bones and teeth",
      "Liver and muscles",
      "Lungs and kidneys",
      "Hair and nails"
    ],
    "answer": 1,
    "explain": "The Essential Nutrients carbohydrates reading says glycogen is a special form of starch that can be stored in the liver and muscles and used as a reserve energy source. All carbohydrates are eventually turned into glucose. From: Essential Nutrients handout."
  },
  {
    "topic": "Carbohydrates",
    "source": "Essential Nutrients handout",
    "q": "According to the Essential Nutrients handout, fiber can help move waste out of the body and may help prevent:",
    "choices": [
      "Scurvy",
      "Rickets",
      "Colon cancer",
      "Anemia"
    ],
    "answer": 2,
    "explain": "The reading lists fiber with starches and glycogen as complex carbohydrates and says fiber, found in vegetables, fruits, beans, peas, and grains, helps move waste out of the body and can help prevent colon cancer. From: Essential Nutrients handout."
  },
  {
    "topic": "Carbohydrates",
    "source": "6 Important Nutrients / Essential Nutrients handout",
    "q": "The 6 Important Nutrients worksheet asks why complex carbohydrates are healthier than simple carbohydrates. The Essential Nutrients reading says complex carbohydrates:",
    "choices": [
      "Give lasting energy and also provide other nutrients such as vitamins and minerals",
      "Dissolve in water, taste sweet, and are used up instantly with no other nutrients",
      "Provide 9 calories per gram, like fat",
      "Cannot be stored and must be eaten every hour"
    ],
    "answer": 0,
    "explain": "Complex carbohydrates give lasting energy (starches, glycogen, and fiber). Foods with complex carbohydrates also provide other important nutrients, such as vitamins and minerals. Simple carbohydrates are sugars that dissolve in water and taste sweet. Filling up on simple-carb foods can keep people from eating enough healthy complex carbohydrates. From: 6 Important Nutrients / Essential Nutrients handout."
  },
  {
    "topic": "Fats",
    "source": "Essential Nutrients handout",
    "q": "According to the Essential Nutrients fats reading, only what percent of teens' total calories each day should come from fats?",
    "choices": [
      "5–10%",
      "15–20%",
      "25–35%",
      "50–60%"
    ],
    "answer": 2,
    "explain": "The handout says only 25–35% of teens' total calories each day should come from fats. The healthiest sources are fish, nuts, and vegetable oils because they contain unsaturated fat. Avoid trans fats. From: Essential Nutrients handout."
  },
  {
    "topic": "Fats",
    "source": "Essential Nutrients handout",
    "q": "The Essential Nutrients handout says trans fats were developed in order to:",
    "choices": [
      "Lower LDL cholesterol and prevent heart disease",
      "Make shipping and storage of foods easier",
      "Replace fiber that is lost when grains are refined",
      "Help the body absorb vitamin C"
    ],
    "answer": 1,
    "explain": "Trans fats are not a natural type of fat. They were developed to make shipping and storage of foods easier. They are found in most margarines, vegetable shortenings, partially hydrogenated vegetable oil, deep-fried chips, and many fast foods and commercial baked goods, and they contribute to harmful cholesterol levels. From: Essential Nutrients handout."
  },
  {
    "topic": "Protein",
    "source": "Essential Nutrients handout",
    "q": "According to the Essential Nutrients handout, extra protein will not build more or stronger muscles. In fact, extra protein can:",
    "choices": [
      "Raise your vitamin C level",
      "Lead to loss of calcium and may make liver or kidney disease worse",
      "Replace the need for water",
      "Turn into fiber in the intestines"
    ],
    "answer": 1,
    "explain": "Most Americans eat more protein than the body needs. Excess proteins can be burned for energy when energy from fats and carbohydrates is gone, but they won't build more or stronger muscles. Extra protein can lead to loss of calcium and may make liver or kidney disease worse. From: Essential Nutrients handout."
  },
  {
    "topic": "Vitamins",
    "source": "Essential Nutrients handout",
    "q": "According to the Essential Nutrients vitamins reading, which is the only vitamin that can be made by the body?",
    "choices": [
      "Vitamin C, from citrus fruit already in the stomach",
      "Vitamin D, through exposure to sunlight",
      "Vitamin K, only when you eat trans fats",
      "Vitamin B12, from drinking water"
    ],
    "answer": 1,
    "explain": "Vitamin D is made by the body through exposure to sunlight. It's the only vitamin that can be made by the body. People need to get the other vitamins from food. From: Essential Nutrients handout."
  },
  {
    "topic": "Vitamins",
    "source": "Essential Nutrients handout",
    "q": "A lack of vitamin C can lead to which disease, according to the Essential Nutrients handout?",
    "choices": [
      "Rickets, with stunted growth and bone pain",
      "Scurvy, with loss of teeth, bleeding gums, muscle pain, and internal bleeding",
      "Osteoporosis, with a Dowager's hump",
      "Type 2 diabetes"
    ],
    "answer": 1,
    "explain": "Lack of vitamin C can lead to scurvy (loss of teeth, bleeding gums, muscle pain, and internal bleeding). Lack of vitamin D can lead to rickets (stunted growth, muscle cramps, and bone pain). Lack of certain B vitamins can cause nerve disorders and anemia. From: Essential Nutrients handout."
  },
  {
    "topic": "Vitamins",
    "source": "Essential Nutrients handout",
    "q": "A lack of vitamin D can lead to which disease, according to the Essential Nutrients handout?",
    "choices": [
      "Scurvy",
      "Rickets",
      "Scurvy and colon cancer",
      "High blood pressure only"
    ],
    "answer": 1,
    "explain": "Lack of vitamin D can lead to rickets, a disease that causes stunted growth, muscle cramps, and bone pain. These deficiency diseases are rarely seen in the United States but are serious in other parts of the world. From: Essential Nutrients handout."
  },
  {
    "topic": "Minerals",
    "source": "Essential Nutrients handout",
    "q": "According to the Essential Nutrients handout, copper helps the body:",
    "choices": [
      "Build vitamin D from sunlight",
      "Use iron for making hemoglobin",
      "Store amino acids in fat cells",
      "Turn fiber into glucose"
    ],
    "answer": 1,
    "explain": "Iron is important for hemoglobin, the molecule that carries oxygen in red blood cells. Copper helps the body use the iron for making hemoglobin. Calcium and magnesium help build healthy bones and teeth. Potassium and sodium help nerves, muscles, kidneys, and fluid balance. From: Essential Nutrients handout."
  },
  {
    "topic": "Water",
    "source": "Essential Nutrients handout",
    "q": "The Essential Nutrients water reading says that under normal conditions the body loses about a pint of water a day through perspiration, but during exercise in hot weather a person can lose as much as:",
    "choices": [
      "1 cup",
      "1 quart",
      "3 gallons in a single day",
      "1 ounce"
    ],
    "answer": 2,
    "explain": "Water helps keep a steady body temperature. Under normal conditions, the body loses about a pint of water a day through perspiration. During exercise in hot weather, a person can lose 3 gallons in a single day. The body also loses about 1 quart of water each day overall, and experts recommend drinking 8 or more glasses of water daily. From: Essential Nutrients handout."
  },
  {
    "topic": "Carbohydrates",
    "source": "Carbohydrates handout",
    "q": "According to the Carbohydrates handout, amylase is an enzyme that:",
    "choices": [
      "Emulsifies fat in the small intestine",
      "Converts starch and glycogen into simple sugars",
      "Carries oxygen in red blood cells",
      "Stores calcium in bones until age 30"
    ],
    "answer": 1,
    "explain": "Complex carbs consist of polysaccharides, long chains of starches, fibers, and glycogen. These molecules require more amylase to digest, which causes a slower and more sustained rise in blood sugar. Amylase converts starch and glycogen into simple sugars. From: Carbohydrates handout."
  },
  {
    "topic": "Calorie Math",
    "source": "Carbohydrates handout",
    "q": "The Carbohydrates handout gives this example: a Thomas Plain Bagel contains 53 grams of carbohydrates. How many of the bagel's calories come from carbohydrates?",
    "choices": [
      "53",
      "212",
      "477",
      "106"
    ],
    "answer": 1,
    "explain": "Carbohydrates provide 4 calories per 1 gram. 53 g × 4 = 212 calories from carbohydrates in the bagel. From: Carbohydrates handout."
  },
  {
    "topic": "Protein",
    "source": "Protein handout",
    "q": "According to the Protein handout, protein makes up about what percent of our body weight?",
    "choices": [
      "5%",
      "10%",
      "20%",
      "50%"
    ],
    "answer": 2,
    "explain": "Protein is one of the three main macronutrients. Protein makes up 20% of our body weight. It consists of our muscles, hair, nails, skin, eyes, heart, and brain. From: Protein handout."
  },
  {
    "topic": "Protein",
    "source": "Protein handout",
    "q": "The Protein handout lists which of these plant foods as complete proteins (they contain all 9 essential amino acids)?",
    "choices": [
      "Apples, lettuce, and white rice only",
      "Quinoa, buckwheat, hempseed, soybeans, and chia seeds",
      "Candy, soda, and corn syrup",
      "Olive oil, butter, and coconut oil"
    ],
    "answer": 1,
    "explain": "Animal proteins are complete. Some plant-based products are also considered complete: quinoa, buckwheat, hempseed, soybeans, and chia seeds. Most other plant proteins are incomplete and can be paired (for example, rice and beans, pita and hummus, beans and tortillas, pasta and peas). From: Protein handout."
  },
  {
    "topic": "Calorie Math",
    "source": "Protein handout",
    "q": "The Protein handout gives this example: a Chobani Non-Fat Plain Greek Yogurt has 16 grams of protein. How many calories come from protein in this product?",
    "choices": [
      "16",
      "32",
      "64",
      "144"
    ],
    "answer": 2,
    "explain": "Protein gives 4 calories per 1 gram. 16 g × 4 cal = 64 calories from protein. From: Protein handout."
  },
  {
    "topic": "Fats",
    "source": "Fats handout",
    "q": "According to the Fats handout, the most common type of fat in your body is:",
    "choices": [
      "Cholesterol only",
      "Triglycerides",
      "Fiber",
      "Glucose"
    ],
    "answer": 1,
    "explain": "Triglycerides are the most common type of fat in your body. Triglycerides break down into two classes of fats known as saturated and unsaturated. From: Fats handout."
  },
  {
    "topic": "Fats",
    "source": "Fats handout",
    "q": "The Fats handout says emulsification of fats takes place in the small intestine, with help from bile. Where is bile made and stored?",
    "choices": [
      "Made in the pancreas and stored in the stomach",
      "Made in the liver and stored in the gallbladder",
      "Made in the kidneys and stored in the bladder",
      "Made in the small intestine and stored in fat cells"
    ],
    "answer": 1,
    "explain": "When we eat fats, stomach juices are not strong enough to break them down on their own. Bile is needed — this is emulsification. Bile breaks fat into smaller molecules so enzymes can finish the job. Bile is made in the liver and stored in the gallbladder. The emulsification of fats takes place in the small intestine. From: Fats handout."
  },
  {
    "topic": "Calorie Math",
    "source": "Fats handout",
    "q": "The Fats handout gives this example: a bag of Hot Cheetos contains 11 grams of fat. How many calories come from fat in this product?",
    "choices": [
      "11",
      "44",
      "77",
      "99"
    ],
    "answer": 3,
    "explain": "Fats provide 9 calories per 1 gram. 11 g × 9 cal = 99 calories from fat. From: Fats handout."
  },
  {
    "topic": "Water",
    "source": "Water and Hydration handout",
    "q": "The Water and Hydration handout says nutritional researchers suggest you drink a minimum of:",
    "choices": [
      "8 ounces, no matter your size",
      "Half your body weight in ounces (for example, a 130-lb person should drink at least 65 ounces)",
      "One gallon per pound of body weight",
      "Only distilled water, because it has the most minerals"
    ],
    "answer": 1,
    "explain": "The amount of water you need varies by body weight, activity, and climate. Researchers suggest a minimum of half your body weight in ounces. Example: a 130 lb individual should consume at least 65 ounces of water a day. The Essential Nutrients Micros slides use the same idea: multiply your weight by .50, and try for 64 oz a day. From: Water and Hydration handout."
  },
  {
    "topic": "Water",
    "source": "Water and Hydration handout",
    "q": "According to the Water and Hydration handout, which source of water does it call the safest and least expensive?",
    "choices": [
      "Tap water, because it is high in chlorine and fluoride",
      "Distilled water, because it is full of minerals",
      "Filtered water",
      "Any caffeinated soda, because it hydrates better than water"
    ],
    "answer": 2,
    "explain": "The handout rates sources this way: tap is an okay source but can be high in chlorine and fluoride; spring is an excellent source, especially when bottled; filtered is the safest source and least expensive; distilled lacks minerals and is not the best choice for drinking water; well water is a good source but should be tested and filtered because it can contain toxins. From: Water and Hydration handout."
  },
  {
    "topic": "Vitamins & Minerals",
    "source": "Vitamins & Minerals info sheet",
    "q": "The Vitamins & Minerals info sheet says vitamins do not contain calories, but they help convert carbs, fats, and proteins into energy. It describes vitamins as:",
    "choices": [
      "Hormones made only in sunlight",
      "Co-enzymes that work with the body's enzymes to process food and allow proper metabolism",
      "A type of incomplete protein",
      "Empty calories"
    ],
    "answer": 1,
    "explain": "Vitamins are micronutrients found in nutrient-dense foods like fruits and vegetables. They do not contain any calories, so they do not provide energy, but they help convert carbs, fats, and proteins into energy. Vitamins are essentially co-enzymes. From: Vitamins & Minerals info sheet."
  },
  {
    "topic": "Vitamins & Minerals",
    "source": "Vitamins & Minerals info sheet",
    "q": "According to the Vitamins & Minerals info sheet, the daily iron quantity listed for teens is:",
    "choices": [
      "11 mg for males and 15 mg for females",
      "15 mg for males and 11 mg for females",
      "1,300 mg for everyone",
      "4,700 mg for everyone"
    ],
    "answer": 0,
    "explain": "For iron, the sheet lists males 11 mg and females 15 mg, with sources such as red meat, seafood, beans, and dark leafy greens. Calcium is listed as 1,300 mg. Electrolytes include sodium (less than 2,000 mg on this sheet) and potassium (4,700 mg). From: Vitamins & Minerals info sheet."
  },
  {
    "topic": "Vitamins & Minerals",
    "source": "Vitamins & Minerals info sheet",
    "q": "The Vitamins & Minerals info sheet lists the daily quantity for potassium as:",
    "choices": [
      "500 mg",
      "1,300 mg",
      "2,000 mg",
      "4,700 mg"
    ],
    "answer": 3,
    "explain": "Under electrolytes, potassium sources include bananas, avocados, and sports drinks, and the daily quantity listed is 4,700 mg. Sodium is listed as less than 2,000 mg on this same sheet. From: Vitamins & Minerals info sheet."
  },
  {
    "topic": "Water",
    "source": "Essential Nutrients Micros slides",
    "q": "The Micros slides say water makes up about 60–75% of your body weight, and that your blood is about:",
    "choices": [
      "10% water",
      "22% water",
      "50% water",
      "90% water"
    ],
    "answer": 3,
    "explain": "One slide says drink at least 64 oz daily (more if active), water makes up 60–75% of body weight, and your blood is ~90% water. Another diagram says water represents 92% of the blood, 75% of the brain, 75% of the muscles, and 22% of the bones. From: Essential Nutrients Micros slides."
  },
  {
    "topic": "Minerals",
    "source": "Essential Nutrients Micros slides",
    "q": "The Micros slides compare your body to a calcium 'bank.' You can 'deposit' calcium until about what age?",
    "choices": [
      "Age 12",
      "Age 18",
      "Age 30",
      "Age 65"
    ],
    "answer": 2,
    "explain": "Your bones need calcium; your body is like a bank. You can 'deposit' calcium until about age 30. Sources include milk, yogurt, fortified OJ, cheese, and pudding. Not getting enough calcium during these years can lead to lower bone density and increase the risk of bone disease later in life. From: Essential Nutrients Micros slides."
  },
  {
    "topic": "Minerals",
    "source": "Essential Nutrients Micros slides",
    "q": "According to the Micros slides, the body can only absorb about how much calcium at a time, so supplements should be taken in doses of that size or less?",
    "choices": [
      "50 mg",
      "500 mg",
      "1,300 mg",
      "4,700 mg"
    ],
    "answer": 1,
    "explain": "Your body can only absorb about 500 mg at a time. Take supplements in doses of 500 mg or less for best absorption, and space out larger daily doses. Most supplements have 200–500 mg. The daily goal listed is 1,300 mg. The slides also warn that soda (phosphoric acid) can hinder calcium absorption. From: Essential Nutrients Micros slides."
  },
  {
    "topic": "Minerals",
    "source": "Essential Nutrients Micros slides",
    "q": "The Micros slides' osteoporosis statistics say that over age 50, about how many women and men will have a fracture?",
    "choices": [
      "1 in 10 women and 1 in 20 men",
      "1 in 2 women and 1 in 4 men",
      "All women and no men",
      "1 in 100 women and 1 in 100 men"
    ],
    "answer": 1,
    "explain": "The slides say an estimated 10 million people have osteoporosis and 34 million have low bone mass. About 44 million people (55% of those 50 and older) are at risk. 1 in 2 women and 1 in 4 men over 50 will have a fracture. Prevention includes adequate calcium and vitamin D, regular weight-bearing exercise, and avoiding smoking and excess alcohol. From: Essential Nutrients Micros slides."
  },
  {
    "topic": "Fats",
    "source": "Essential Nutrients Macros slides",
    "q": "On the Macros slides, LDL is nicknamed the 'lousy' cholesterol (the clogger), and HDL is nicknamed:",
    "choices": [
      "The 'heavy' cholesterol (the sinker)",
      "The 'healthy' cholesterol (the cleaner)",
      "The 'hidden' cholesterol (the leftover)",
      "The 'hydrogenated' cholesterol"
    ],
    "answer": 1,
    "explain": "LDL = 'LOUSY' cholesterol (the clogger), linked to atherosclerosis. HDL = 'HEALTHY' cholesterol (the cleaner), boosted by exercise, healthy fats, and fiber. The same slide says your liver makes ALL the cholesterol your body actually needs, so you don't need to get any from food. From: Essential Nutrients Macros slides."
  },
  {
    "topic": "Fats",
    "source": "Essential Nutrients Macros slides",
    "q": "The Macros slides' cheese comparison says swapping 1 cup shredded cheddar for mozzarella saves you about how much saturated fat?",
    "choices": [
      "1 gram",
      "10 grams",
      "34 grams",
      "100 grams"
    ],
    "answer": 1,
    "explain": "Cheddar (1 cup shredded) has 34 g saturated fat and 420 calories. Mozzarella has 24 g saturated fat and 320 calories. The slide's quick fact: swapping cheddar for mozzarella saves you 10 g of saturated fat. From: Essential Nutrients Macros slides."
  },
  {
    "topic": "Carbohydrates",
    "source": "Essential Nutrients Macros slides",
    "q": "The Macros fiber slide calls fiber the 'essential non-nutrient' and says it contains:",
    "choices": [
      "9 calories per gram",
      "4 calories per gram",
      "No calories",
      "7 calories per gram"
    ],
    "answer": 2,
    "explain": "Fiber is an indigestible carbohydrate crucial for digestive health and contains NO calories. Soluble fiber (oats, apples, beans, citrus) dissolves in water to form a gel and helps control blood sugar and lower cholesterol. Insoluble fiber (whole grains, nuts, cauliflower, green beans) promotes movement through the digestive system and helps prevent constipation. The daily recommendation listed is 25–30 g. From: Essential Nutrients Macros slides."
  },
  {
    "topic": "Carbohydrates",
    "source": "Essential Nutrients Macros slides",
    "q": "The Macros slides say a whole grain kernel has bran, endosperm, and germ. When grains are refined, 'enriched flour' may add some vitamins back, but what is 'lost forever'?",
    "choices": [
      "The starch in the endosperm",
      "The essential fiber",
      "All of the calories",
      "The water"
    ],
    "answer": 1,
    "explain": "The bran (outer shell) has fiber and B vitamins. The endosperm is the starchy center (carbohydrates and protein). The germ is the nutrient-rich core (healthy fats, vitamins E and B). Refining strips away key nutrients and fiber. Note: 'Enriched flour' adds some vitamins back, but the essential FIBER is lost forever. From: Essential Nutrients Macros slides."
  },
  {
    "topic": "Sugar",
    "source": "Essential Nutrients Macros slides",
    "q": "The Macros 'sugar detective' slide's golden rule is that ingredients are listed by quantity, so if a sugar name is near the top of the list you should:",
    "choices": [
      "Assume the food is a complete protein",
      "Put it back",
      "Ignore the Nutrition Facts",
      "Count it as a vegetable serving"
    ],
    "answer": 1,
    "explain": "Hidden names for sugar on the slide include high-fructose corn syrup, sucrose, dextrose, maltose, fruit juice concentrate, agave nectar, cane sugar, and molasses. The golden rule: ingredients are listed by quantity. If a sugar name is near the top, put it back. Even 'healthy' foods like salad dressing, ketchup, and flavored yogurt can be loaded with added sugar. From: Essential Nutrients Macros slides."
  },
  {
    "topic": "Macronutrients",
    "source": "MacroNutrient Cheat Sheet",
    "q": "The MacroNutrient Cheat Sheet lists these daily dietary percentages for consumption:",
    "choices": [
      "Carbohydrate 10–15%, protein 45–65%, fat 5–10%",
      "Carbohydrate 45–65%, protein 10–15%, fat 30–35%",
      "Carbohydrate 80–90%, protein 2–3%, fat 2–3%",
      "Carbohydrate 20–25%, protein 40–50%, fat 40–50%"
    ],
    "answer": 1,
    "explain": "The cheat sheet and the Calories 2026 slides both list carbohydrate 45–65%, protein 10–15%, and fat 30–35% of total calories. They also list the calorie factors: carbohydrates 4 cal/gram, protein 4 cal/gram, and fats 9 cal/gram. (This percentage question is a fact from the sheet, not a calculation.) From: MacroNutrient Cheat Sheet."
  },
  {
    "topic": "Protein",
    "source": "MacroNutrient Cheat Sheet",
    "q": "The MacroNutrient Cheat Sheet says incomplete proteins come from plant sources in 3 categories, and you must combine 2 categories to make them complete. Those 3 categories are:",
    "choices": [
      "Fruits, oils, and candy",
      "Nuts & seeds; grains (bread, rice, cereal); and legumes (lentils, dry beans, soy products)",
      "Beef, chicken, and pork",
      "Milk, cheese, and ice cream"
    ],
    "answer": 1,
    "explain": "Incomplete proteins lack 1 or more amino acids. The 3 plant categories are nuts & seeds, grains (bread, rice, cereal), and legumes (lentils, dry beans, soy products). You must combine 2 categories to make them complete. Caffeine is also noted on the sheet as a diuretic, and it says pure water is always best, with a minimum of 1/2 of your body weight in ounces. From: MacroNutrient Cheat Sheet."
  },
  {
    "topic": "MyPlate & Guidelines",
    "source": "Guidelines for Healthy Eating",
    "q": "The Guidelines for Healthy Eating reading says the Dietary Guidelines for Americans are updated and published:",
    "choices": [
      "Every year",
      "Every 5 years",
      "Every 25 years",
      "Only once, in 1980"
    ],
    "answer": 1,
    "explain": "The Dietary Guidelines for Americans are created by health and nutrition experts and are updated every five years to reflect new evidence. The class reading is for the 2025–2030 guidelines. One main recommendation is to make half your plate fruits and vegetables, and to keep added sugars to less than 10% of your daily calories. From: Guidelines for Healthy Eating."
  },
  {
    "topic": "MyPlate & Guidelines",
    "source": "Guidelines for Healthy Eating",
    "q": "The 2025–2030 Guidelines for Healthy Eating say to keep added sugars to less than what percent of your daily calories?",
    "choices": [
      "1%",
      "10%",
      "25%",
      "50%"
    ],
    "answer": 1,
    "explain": "The guidelines suggest keeping added sugars to less than 10% of your daily calories. Choosing water instead of sugary drinks and limiting sweets can make a big difference. The same 10% limit appears on the Macros slides and Fast Food slides. From: Guidelines for Healthy Eating."
  },
  {
    "topic": "Brain & Body",
    "source": "What Your Brain and Your Body Need",
    "q": "What Your Brain and Your Body Need says that inside your gut are trillions of bacteria, known as the microbiome, which play a powerful role in:",
    "choices": [
      "Only tooth enamel",
      "Digestion, immunity, and even mental health",
      "Making trans fats",
      "Storing calcium after age 65 only"
    ],
    "answer": 1,
    "explain": "Inside your gut are trillions of bacteria known as the microbiome, which play a powerful role in your digestion, immunity, and even mental health. The reading also describes the gut-brain connection: what happens in your digestive system can influence your mood, memory, and motivation. From: What Your Brain and Your Body Need."
  },
  {
    "topic": "Food Labels",
    "source": "Food Labels 26",
    "q": "Food Labels 26 says the FDA requires food manufacturers to list the percent Daily Value of which four vitamins and minerals on the Nutrition Facts label?",
    "choices": [
      "Vitamin C, vitamin A, sodium, and chloride",
      "Vitamin D, calcium, iron, and potassium",
      "Vitamin E, vitamin K, copper, and zinc",
      "Vitamin B12, folate, iodine, and selenium"
    ],
    "answer": 1,
    "explain": "The FDA requires the percent Daily Value of vitamin D, calcium, iron, and potassium. Other vitamins and minerals can also be listed but are not required by law. Percent Daily Values are based on a 2,000-calorie-a-day diet. From: Food Labels 26."
  },
  {
    "topic": "Food Labels",
    "source": "Food Labels 26",
    "q": "According to Food Labels 26, a % Daily Value of 5% or less is low, and a % Daily Value of 20% or more is high. You should aim for a HIGH %DV for:",
    "choices": [
      "Saturated fat, sodium, and added sugars",
      "Fiber, vitamin D, calcium, iron, and potassium",
      "Trans fat and cholesterol only",
      "Alcohol and caffeine"
    ],
    "answer": 1,
    "explain": "5% DV or less is LOW — aim for low on nutrients you want to limit, like saturated fat, sodium, and added sugars. 20% DV or more is HIGH — aim for high on fiber, vitamin D, calcium, iron, and potassium. From: Food Labels 26."
  },
  {
    "topic": "Food Labels",
    "source": "Food Labels 26",
    "q": "According to Food Labels 26, peak bone-building years are during:",
    "choices": [
      "Early childhood only, before age 8",
      "Your teens and early twenties",
      "Ages 50 to 65",
      "Only after menopause"
    ],
    "answer": 1,
    "explain": "Calcium is essential for building strong bones that will last a lifetime. Peak bone-building years are during your teens and early twenties. Getting enough calcium now can help prevent bone issues later. Vitamin D is also key because it helps your body absorb the calcium you eat. This matches the Micros slides' calcium 'bank' idea (deposits until about age 30). From: Food Labels 26."
  },
  {
    "topic": "Food Labels",
    "source": "Food Labels slides",
    "q": "The Food Labels slides' message 'Think Before You Swallow!!!' says there are no 'bad' foods you should never eat, but most of us tend to eat too many foods high in:",
    "choices": [
      "Water, fiber, and vitamin D",
      "Fat, salt, and sugar",
      "Lean protein and whole grains",
      "Calcium and potassium only"
    ],
    "answer": 1,
    "explain": "The slides say there are no 'bad' foods that you should never eat, but most of us tend to eat too many foods high in fat, salt, and sugar. These unhealthful eating habits can cause a person to become overweight or obese and can raise the risk of chronic diseases such as heart disease, cancer, diabetes, and osteoporosis. From: Food Labels slides."
  },
  {
    "topic": "Calories & Weight",
    "source": "Calories 2026 slides",
    "q": "The Calories 2026 slides say you should know that 1 pound equals how many calories, and that the safest way to lose weight is:",
    "choices": [
      "500 calories; 10 pounds in 10 days",
      "3,500 calories; 1–2 pounds per week",
      "100 calories; 5 pounds per day",
      "10,000 calories; 1 pound per month"
    ],
    "answer": 1,
    "explain": "Know that 1 lb. = 3,500 calories. The safest way to lose weight is 1–2 lbs. per week. The slides also say women should never go below 1,200 calories/day and men should never go below 1,500 calories/day. 'Losing 10 lbs. in 10 days' doesn't work for fat loss. From: Calories 2026 slides."
  },
  {
    "topic": "Calories & Weight",
    "source": "Calories 2026 slides",
    "q": "According to the Calories 2026 slides, women should never go below 1,200 calories a day and men should never go below 1,500, because cutting calories below those levels can put the body into 'starvation mode,' which includes:",
    "choices": [
      "Faster metabolism and no hunger",
      "Slowed metabolism, hunger pains, and fat cells that do not release fat",
      "Immediate gain of muscle and loss of all fat",
      "A higher set point for vitamin C"
    ],
    "answer": 1,
    "explain": "Set-point theory says the body uses hormones, hunger, behavior changes, and other mechanisms to 'defend' a certain range of body weight, like a thermostat. When you cut calories below 1,200/1,500, your body goes into starvation mode: slowed metabolism, hunger pains, and fat cells do not release fat. From: Calories 2026 slides."
  },
  {
    "topic": "Calories & Weight",
    "source": "Calories 2026 slides",
    "q": "The Calories 2026 slides describe the 'Yo-Yo Syndrome' this way: if you lose weight fast, you:",
    "choices": [
      "Lose only fat and keep it off forever",
      "Lose lean muscle and gain it back as fat",
      "Raise your HDL and lower your set point permanently",
      "Need no calories for a month"
    ],
    "answer": 1,
    "explain": "Yo-Yo Syndrome: if you lose weight fast, you lose lean muscle and gain it back as fat. The slides also warn that most diets have too few calories, slow your metabolism, and feel too drastic to keep up. Don't be part of the U.S.'s $33 billion diet rip-off, and beware of ads that promise quick weight loss and unrealistic claims. From: Calories 2026 slides."
  },
  {
    "topic": "Eating Out",
    "source": "Fast Food slides",
    "q": "The Fast Food slides break down sodium in one burger and get a total of 1,194 mg. Which two toppings contributed a surprising amount of that sodium?",
    "choices": [
      "Lettuce (0 mg) and tomato (2 mg) were the highest",
      "The bun (256 mg) and pickles (183 mg), along with bacon, cheese, and ketchup",
      "Only the meat, which had 1,194 mg by itself",
      "The diet soda, which had 800 mg"
    ],
    "answer": 1,
    "explain": "The slide 'Where's the Sodium?' lists: bun 256 mg, cheese 200 mg, bacon 274 mg, burger 125 mg, tomato 2 mg, lettuce 0 mg, pickles 183 mg, and ketchup 154 mg, for a total of 1,194 mg — already a large share of the 2,300 mg daily limit the slides list for teens. From: Fast Food slides."
  },
  {
    "topic": "Eating Out",
    "source": "Eating Healthy at Fast Food Restaurants",
    "q": "Eating Healthy at Fast Food Restaurants warns that a 'healthier' option is not always lower in calories. Its example is that low-fat chocolate milk offered for children's meals:",
    "choices": [
      "Has zero sugar and fewer calories than water",
      "Contains more calories and almost as much sugar as the same-sized soft drink",
      "Is required by law to be the lowest-calorie item on the menu",
      "Counts as a vegetable because it is a dairy food"
    ],
    "answer": 1,
    "explain": "Some restaurants offer low-fat or reduced-fat options, but there is often a trade-off. Sometimes an option with lower fat may contain more sugar and not necessarily be lower in calories. The example is low-fat chocolate milk, which contains more calories and almost as much sugar as the same-sized soft drink. From: Eating Healthy at Fast Food Restaurants."
  },
  {
    "topic": "Eating Out",
    "source": "Eating Healthy at Fast Food Restaurants",
    "q": "The Eating Healthy at Fast Food Restaurants handout says that if a menu item is described as deep fried, battered, creamy, buttery, or crispy, it is probably:",
    "choices": [
      "A whole-grain, low-calorie choice",
      "High in calories and fat",
      "A good source of fiber and vitamin D",
      "Sodium-free"
    ],
    "answer": 1,
    "explain": "Pay attention to the descriptions on the menu. If a food item is described as deep fried, battered, creamy, buttery, or crispy, it's probably high in calories and fat. Better steps include choosing broiled, grilled, or baked meat; ordering sauces on the side; not supersizing; and drinking water or 100% juice instead of soda. For an inactive high school student, the recommended daily intake listed is 1,800–2,400 calories, no more than 50–80 grams of fat, and no more than 2,300 mg of sodium. From: Eating Healthy at Fast Food Restaurants."
  },
  {
    "topic": "MyPlate & Guidelines",
    "source": "What's on My Plate 26",
    "q": "What's on My Plate 26 says the Dairy group includes foods that provide calcium, and that foods that do not have calcium are:",
    "choices": [
      "Still in the Dairy group if they are white",
      "Not considered part of this group",
      "Counted as vegetables",
      "The only complete proteins"
    ],
    "answer": 1,
    "explain": "Dairy gives your body vitamins and minerals and includes foods that provide calcium. Foods that do not have calcium are not considered part of this group. Choose low-fat or non-fat options to help limit unhealthy fat. Examples: milk, cheese, puddings made with milk, and calcium-fortified soy milk. From: What's on My Plate 26."
  },
  {
    "topic": "MyPlate & Guidelines",
    "source": "What's on My Plate 26",
    "q": "According to What's on My Plate 26, vegans choose not to eat any foods from animal sources. Vitamin B12 is only found in animal products, so vegetarians must get it from:",
    "choices": [
      "Sunlight",
      "Fortified foods",
      "Distilled water",
      "Olive oil"
    ],
    "answer": 1,
    "explain": "Vegetarian diets tend to be rich in fiber and low in saturated fat. Protein can come from beans, nuts, nut butters, peas, and soy products. Iron can be found in fortified cereals, spinach, kidney beans, peas, lentils, turnip greens, and some dried fruits. Zinc sources include many types of beans, fortified cereals, wheat germ, and pumpkin seeds. Vitamin B12 is only found in animal products, so vegetarians must get it from fortified foods. From: What's on My Plate 26."
  },
  {
    "topic": "MyPlate & Guidelines",
    "source": "Realfood.gov Scavenger Hunt",
    "q": "The Realfood.gov Scavenger Hunt asks students to think like fact-checkers, including why the old food pyramid is considered outdated and what replaced it. In U.S. nutrition education, the Food Guide Pyramid was later replaced by MyPyramid and then, in 2011, by:",
    "choices": [
      "The Atkins Diet",
      "MyPlate",
      "The Beverly Hills Diet",
      "A warning label on every fruit"
    ],
    "answer": 1,
    "explain": "The scavenger hunt asks how many times the old pyramid has been replaced or updated, what it was replaced with, and when. It also asks who created or runs realfood.gov and why knowing who runs a nutrition website helps you decide if it's trustworthy. MyPlate replaced the pyramid as the USDA's visual food guide in 2011. Always check the source, not just the message. From: Realfood.gov Scavenger Hunt."
  },
  {
    "topic": "Eating Out",
    "source": "Restaurant analysis (Chick-fil-A deck)",
    "q": "In the restaurant analysis deck, an 'unhealthy' combo (sandwich, large waffle fries, chocolate milkshake, and brownie) totaled about 2,650 mg of sodium. That amount is:",
    "choices": [
      "Well under a half day's sodium limit",
      "Above the general daily sodium reference (about 2,300 mg) in a single meal",
      "Equal to the potassium daily quantity of 4,700 mg",
      "So low it would cause dehydration"
    ],
    "answer": 1,
    "explain": "The analysis flagged that one combination meal can exceed a whole day's general sodium reference (and can also approach a whole day's calories, with very high fat and sugar). The healthier comparison meal used grilled nuggets, fruit, unsweetened iced tea, and a small dessert, totaling far less sodium (515 mg) and only 315 calories. From: Restaurant analysis (Chick-fil-A deck)."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "According to Fed Up, up until 1953, doctors and scientists believed that what could increase your risk of heart attacks and decrease your sex drive?",
    "choices": [
      "Drinking water",
      "Exercise",
      "Eating vegetables",
      "Getting sunlight"
    ],
    "answer": 1,
    "explain": "Katie Couric says that up until this point, exercise had been considered taboo. Doctors even warned it would cause heart attacks and diminish your sex drive. Then Dr. Jean Mayer's work in 1953 helped spark a fitness revolution. The film later argues that 'eat less, exercise more' alone has not solved the obesity epidemic. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "Fed Up says that a decade after fitness-club memberships more than doubled (1980 to 2000), two out of every three Americans were:",
    "choices": [
      "At a healthy weight",
      "Either overweight or obese",
      "Diagnosed with scurvy",
      "Eating no sugar at all"
    ],
    "answer": 1,
    "explain": "Between 1980 and 2000, fitness club memberships more than doubled, and the obesity rate also doubled. A decade later, two out of every three Americans were either overweight or obese. The class question sheet phrases this as '2 out of every ___ Americans are obese,' and the film's wording is overweight or obese. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "On the Fed Up question sheet, Maggie from Oklahoma swims how many times a week and what does she do with her dog on weekends?",
    "choices": [
      "Once a week; races her dog",
      "Four times a week; walks her dog",
      "Seven times a day; never goes outside",
      "Never; she only lifts weights"
    ],
    "answer": 1,
    "explain": "Maggie says she swims four days a week and walks her dogs on the weekends, and that she eats healthy and exercises a lot, yet her weight has mostly stayed the same. The film uses this to argue that you cannot simply exercise your way out of the problem. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "According to Fed Up, to burn off just one 20-ounce Coke, a child would have to bike for:",
    "choices": [
      "5 minutes",
      "20 minutes",
      "1 hour and 15 minutes",
      "8 hours"
    ],
    "answer": 2,
    "explain": "The film says: to burn off just one 20-ounce Coke, a child would have to bike for an hour and 15 minutes. Most people don't have that much time in their day. This is one of the fill-in-the-blank items on the class question sheet. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "In Fed Up, what is concerning about what Wesley's doctor says during his appointment?",
    "choices": [
      "The doctor says Wesley has already reached a healthy weight",
      "The doctor is concerned because Wesley has continued to gain weight, even faster than before, and looks bigger than he did a few years ago",
      "The doctor recommends that Wesley drink more soda",
      "The doctor says exercise is still taboo"
    ],
    "answer": 1,
    "explain": "Wesley's doctor is happy to hear the family thinks diet control is going better, but is concerned because Wesley doesn't look any thinner. The data show he has continued to gain weight even faster than before, and his weight is even higher than last time. That is the concerning comment on the class question sheet. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "Why, according to Fed Up, did the 1977 McGovern Report not end up clearly telling Americans to reduce intake of excess red meat, sugar, and fat?",
    "choices": [
      "Scientists had not yet discovered sugar",
      "The egg, sugar, dairy, and beef associations rejected the report and demanded a rewrite, and the words 'reduced intake' were removed",
      "Senator McGovern refused to publish any dietary goals",
      "The report was only about exercise, not food"
    ],
    "answer": 1,
    "explain": "The committee issued the first dietary goals for Americans, noting that the diet had become overly rich in fatty meats, saturated fats, cholesterol, and sugar. The egg, sugar, dairy, and beef associations, with sales in danger, united and flat-out rejected the McGovern Report and demanded a rewrite. The words 'reduced intake' were removed. The 1980s then began with a low-fat doctrine, and sugar was added to make fat-free foods taste good. Between 1977 and 2000, Americans doubled their daily intake of sugar. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "In Fed Up, Dr. Robert Lustig says insulin's job is to:",
    "choices": [
      "Turn fat into vitamin D",
      "Turn sugar into fat for storage",
      "Turn fiber into protein",
      "Remove sodium from the blood"
    ],
    "answer": 1,
    "explain": "The film says fructose, the sweet part of sugar, can only be processed in the liver. When the liver is pushed to the max, the pancreas produces excess insulin. Lustig: 'Insulin is the energy storage hormone. Insulin turns sugar into fat for storage. That's insulin's job.' High insulin can also block your brain from receiving the signal that you're full. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "Fed Up states that sugar is how many times more addictive than cocaine?",
    "choices": [
      "2 times",
      "4 times",
      "8 times",
      "100 times"
    ],
    "answer": 2,
    "explain": "This is a claim made in the film, and it is one of the fill-in-the-blank items on the class question sheet. The film also describes a study in which 40 out of 43 cocaine-addicted laboratory rats chose sugar water over cocaine, and says the brain lights up with sugar just as it does with cocaine or heroin. This is the documentary's claim, not a fact you have to accept uncritically, but it is what the film and the worksheet expect. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "The Fed Up question sheet asks for the most commonly used name that sugar 'hides behind.' According to the film, that name is:",
    "choices": [
      "Sea salt",
      "High-fructose corn syrup",
      "Whole wheat",
      "Monounsaturated fat"
    ],
    "answer": 1,
    "explain": "Couric says sugar can hide behind many names on nutrition labels, like sucrose, fructose, glucose, dextrose, lactose, maltose, invert sugar, and turbinado sugar — and the most well-known of all, high-fructose corn syrup. Lustig adds that studies show no difference between high-fructose corn syrup and sugar: they're both equally bad. The class Food Labels materials also tell you to watch for words that end in 'ose.' From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "According to Fed Up, what did Dairy Management do to get the public to eat more cheese?",
    "choices": [
      "It banned cheese from school lunches",
      "It helped market and create cheesier menu items (for example, cheesier pizzas and cheeseburgers) so people would eat more cheese",
      "It required warning labels on all cheese",
      "It told Americans to stop drinking skim milk"
    ],
    "answer": 1,
    "explain": "When demand for low-fat milk rose, leftover milk fat was turned into cheese. Instead of pushing the dairy industry to cut production, Dairy Management (financed by farmers, with USDA oversight) helped sell more cheese by getting people to eat more of it — including cheesier products at chains such as Pizza Hut, Wendy's, and Burger King, as described in the film. From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "The Fed Up question sheet asks what unhealthy food was decided to be considered a vegetable in school cafeterias across the United States. The film's example is:",
    "choices": [
      "Broccoli",
      "Pizza (because of the tomato paste), after industry lobbying",
      "Apples",
      "Plain oatmeal"
    ],
    "answer": 1,
    "explain": "When new USDA school-lunch standards might have eliminated pizza, a major school-pizza company and a senator worked to protect frozen pizzas in school lunches. The effect, the film says, was to count a slice of pizza as a vegetable because of the tomato paste. A speaker in the film says, 'It's common sense. It's not a vegetable.' From: Fed Up Documentary."
  },
  {
    "topic": "Fed Up",
    "source": "Fed Up Documentary",
    "q": "Fed Up says junk food companies today act and advertise to youngsters in a way that which companies did 'back in the day'?",
    "choices": [
      "Bicycle companies",
      "Tobacco companies",
      "Farmers' markets",
      "Water utilities"
    ],
    "answer": 1,
    "explain": "The film compares junk-food advertising, especially to children, with how tobacco companies marketed cigarettes (including ads on kids' shows). One speaker says junk food companies are acting very much like tobacco companies did 30 and 40 years ago. The closing 'What if' ideas include a Surgeon General warning on soda, banning fast-food chains from public schools, showing the percentage next to sugar on the Nutrition Facts label, and having celebrities who sell soft drinks also have to pitch a vegetable. From: Fed Up Documentary."
  },
  {
    "topic": "Eating Out",
    "source": "Fast Food slides",
    "q": "On the Fast Food slides' 'Which meal has the least amount of fat?' comparison, which meal had the LEAST fat?",
    "choices": [
      "Quarter-pound burger with cheese, large fries, and diet soda (54 grams of fat)",
      "Crispy chicken salad with 2 ounces of creamy Caesar dressing and regular soda (34 grams of fat)",
      "Taco salad and bottled water (48 grams of fat)",
      "All three meals had exactly the same fat"
    ],
    "answer": 1,
    "explain": "This is a trick the slides want you to notice: a salad is not automatically the lowest-fat choice, but in this comparison the crispy chicken salad with creamy Caesar and regular soda still had the least fat at 34 grams. The burger meal had 54 grams and the taco salad had 48 grams. Dressings and toppings still add a lot of fat, so you have to check the numbers. From: Fast Food slides."
  }
];
