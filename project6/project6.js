const periodicTable = document.getElementById("periodic-table");
const elementInfo = document.getElementById("element-info");
const searchInput = document.getElementById("search-input");
const elementName = document.getElementById("element-name");
const elementSymbol = document.getElementById("element-symbol");
const elementAtomicNumber = document.getElementById("element-atomic-number");
const elementGroup = document.getElementById("element-group");

const elements = [
  { number: 1, symbol: "H", name: "Hydrogen", group: "1A" },
  { number: 2, symbol: "He", name: "Helium", group: "8A" },
  { number: 3, symbol: "Li", name: "Lithium", group: "1A" },
  { number: 4, symbol: "Be", name: "Beryllium", group: "2A" },
  { number: 5, symbol: "B", name: "Boron", group: "3A" },
  { number: 6, symbol: "C", name: "Carbon", group: "4A" },
  { number: 7, symbol: "N", name: "Nitrogen", group: "5A" },
  { number: 8, symbol: "O", name: "Oxygen", group: "6A" },
  { number: 9, symbol: "F", name: "Fluorine", group: "7A" },
  { number: 10, symbol: "Ne", name: "Neon", group: "8A" },
  { number: 11, symbol: "Na", name: "Sodium", group: "1A" },
  { number: 12, symbol: "Mg", name: "Magnesium", group: "2A" },
  { number: 13, symbol: "Al", name: "Aluminum", group: "3A" },
  { number: 14, symbol: "Si", name: "Silicon", group: "4A" },
  { number: 15, symbol: "P", name: "Phosphorus", group: "5A" },
  { number: 16, symbol: "S", name: "Sulfur", group: "6A" },
  { number: 17, symbol: "Cl", name: "Chlorine", group: "7A" },
  { number: 18, symbol: "Ar", name: "Argon", group: "8A" },
  { number: 19, symbol: "K", name: "Potassium", group: "1A" },
  { number: 20, symbol: "Ca", name: "Calcium", group: "2A" },
  { number: 21, symbol: "Sc", name: "Scandium", group: "3B" },
  { number: 22, symbol: "Ti", name: "Titanium", group: "4B" },
  { number: 23, symbol: "V", name: "Vanadium", group: "5B" },
  { number: 24, symbol: "Cr", name: "Chromium", group: "6B" },
  { number: 25, symbol: "Mn", name: "Manganese", group: "7B" },
  { number: 26, symbol: "Fe", name: "Iron", group: "8B" },
  { number: 27, symbol: "Co", name: "Cobalt", group: "8B" },
  { number: 28, symbol: "Ni", name: "Nickel", group: "8B" },
  { number: 29, symbol: "Cu", name: "Copper", group: "1B" },
  { number: 30, symbol: "Zn", name: "Zinc", group: "2B" },
  { number: 31, symbol: "Ga", name: "Gallium", group: "3A" },
  { number: 32, symbol: "Ge", name: "Germanium", group: "4A" },
  { number: 33, symbol: "As", name: "Arsenic", group: "5A" },
  { number: 34, symbol: "Se", name: "Selenium", group: "6A" },
  { number: 35, symbol: "Br", name: "Bromine", group: "7A" },
  { number: 36, symbol: "Kr", name: "Krypton", group: "8A" },
  { number: 37, symbol: "Rb", name: "Rubidium", group: "1A" },
  { number: 38, symbol: "Sr", name: "Strontium", group: "2A" },
  { number: 39, symbol: "Y", name: "Yttrium", group: "3B" },
  { number: 40, symbol: "Zr", name: "Zirconium", group: "4B" },
  { number: 41, symbol: "Nb", name: "Niobium", group: "5B" },
  { number: 42, symbol: "Mo", name: "Molybdenum", group: "6B" },
  { number: 43, symbol: "Tc", name: "Technetium", group: "7B" },
  { number: 44, symbol: "Ru", name: "Ruthenium", group: "8B" },
  { number: 45, symbol: "Rh", name: "Rhodium", group: "8B" },
  { number: 46, symbol: "Pd", name: "Palladium", group: "8B" },
  { number: 47, symbol: "Ag", name: "Silver", group: "1B" },
  { number: 48, symbol: "Cd", name: "Cadmium", group: "2B" },
  { number: 49, symbol: "In", name: "Indium", group: "3A" },
  { number: 50, symbol: "Sn", name: "Tin", group: "4A" },
  { number: 51, symbol: "Sb", name: "Antimony", group: "5A" },
  { number: 52, symbol: "Te", name: "Tellurium", group: "6A" },
  { number: 53, symbol: "I", name: "Iodine", group: "7A" },
  { number: 54, symbol: "Xe", name: "Xenon", group: "8A" },
  { number: 55, symbol: "Cs", name: "Cesium", group: "1A" },
  { number: 56, symbol: "Ba", name: "Barium", group: "2A" },
  { number: 57, symbol: "La", name: "Lanthanum", group: "3B" },
  { number: 58, symbol: "Ce", name: "Cerium", group: "Lanthanides" },
  { number: 59, symbol: "Pr", name: "Praseodymium", group: "Lanthanides" },
  { number: 60, symbol: "Nd", name: "Neodymium", group: "Lanthanides" },
  { number: 61, symbol: "Pm", name: "Promethium", group: "Lanthanides" },
  { number: 62, symbol: "Sm", name: "Samarium", group: "Lanthanides" },
  { number: 63, symbol: "Eu", name: "Europium", group: "Lanthanides" },
  { number: 64, symbol: "Gd", name: "Gadolinium", group: "Lanthanides" },
  { number: 65, symbol: "Tb", name: "Terbium", group: "Lanthanides" },
  { number: 66, symbol: "Dy", name: "Dysprosium", group: "Lanthanides" },
  { number: 67, symbol: "Ho", name: "Holmium", group: "Lanthanides" },
  { number: 68, symbol: "Er", name: "Erbium", group: "Lanthanides" },
  { number: 69, symbol: "Tm", name: "Thulium", group: "Lanthanides" },
  { number: 70, symbol: "Yb", name: "Ytterbium", group: "Lanthanides" },
  { number: 71, symbol: "Lu", name: "Lutetium", group: "Lanthanides" },
  { number: 72, symbol: "Hf", name: "Hafnium", group: "4B" },
  { number: 73, symbol: "Ta", name: "Tantalum", group: "5B" },
  { number: 74, symbol: "W", name: "Tungsten", group: "6B" },
  { number: 75, symbol: "Re", name: "Rhenium", group: "7B" },
  { number: 76, symbol: "Os", name: "Osmium", group: "8B" },
  { number: 77, symbol: "Ir", name: "Iridium", group: "8B" },
  { number: 78, symbol: "Pt", name: "Platinum", group: "8B" },
  { number: 79, symbol: "Au", name: "Gold", group: "1B" },
  { number: 80, symbol: "Hg", name: "Mercury", group: "2B" },
  { number: 81, symbol: "Tl", name: "Thallium", group: "3A" },
  { number: 82, symbol: "Pb", name: "Lead", group: "4A" },
  { number: 83, symbol: "Bi", name: "Bismuth", group: "5A" },
  { number: 84, symbol: "Po", name: "Polonium", group: "6A" },
  { number: 85, symbol: "At", name: "Astatine", group: "7A" },
  { number: 86, symbol: "Rn", name: "Radon", group: "8A" },
  { number: 87, symbol: "Fr", name: "Francium", group: "1A" },
  { number: 88, symbol: "Ra", name: "Radium", group: "2A" },
  { number: 89, symbol: "Ac", name: "Actinium", group: "Actinides" },
  { number: 90, symbol: "Th", name: "Thorium", group: "Actinides" },
  { number: 91, symbol: "Pa", name: "Protactinium", group: "Actinides" },
  { number: 92, symbol: "U", name: "Uranium", group: "Actinides" },
  { number: 93, symbol: "Np", name: "Neptunium", group: "Actinides" },
  { number: 94, symbol: "Pu", name: "Plutonium", group: "Actinides" },
  { number: 95, symbol: "Am", name: "Americium", group: "Actinides" },
  { number: 96, symbol: "Cm", name: "Curium", group: "Actinides" },
  { number: 97, symbol: "Bk", name: "Berkelium", group: "Actinides" },
  { number: 98, symbol: "Cf", name: "Californium", group: "Actinides" },
  { number: 99, symbol: "Es", name: "Einsteinium", group: "Actinides" },
  { number: 100, symbol: "Fm", name: "Fermium", group: "Actinides" },
  { number: 101, symbol: "Md", name: "Mendelevium", group: "Actinides" },
  { number: 102, symbol: "No", name: "Nobelium", group: "Actinides" },
  { number: 103, symbol: "Lr", name: "Lawrencium", group: "Actinides" },
  { number: 104, symbol: "Rf", name: "Rutherfordium", group: "4B" },
  { number: 105, symbol: "Db", name: "Dubnium", group: "5B" },
  { number: 106, symbol: "Sg", name: "Seaborgium", group: "6B" },
  { number: 107, symbol: "Bh", name: "Bohrium", group: "7B" },
  { number: 108, symbol: "Hs", name: "Hassium", group: "8B" },
  { number: 109, symbol: "Mt", name: "Meitnerium", group: "8B" },
  { number: 110, symbol: "Ds", name: "Darmstadtium", group: "8B" },
  { number: 111, symbol: "Rg", name: "Roentgenium", group: "1B" },
  { number: 112, symbol: "Cn", name: "Copernicium", group: "2B" },
  { number: 113, symbol: "Nh", name: "Nihonium", group: "3A" },
  { number: 114, symbol: "Fl", name: "Flerovium", group: "4A" },
  { number: 115, symbol: "Mc", name: "Moscovium", group: "5A" },
  { number: 116, symbol: "Lv", name: "Livermorium", group: "6A" },
  { number: 117, symbol: "Ts", name: "Tennessine", group: "7A" },
  { number: 118, symbol: "Og", name: "Oganesson", group: "8A" },
];

function createTable() {
  elements.forEach((el) => {
    const elementDiv = document.createElement("div");
    elementDiv.className = "element";
    elementDiv.dataset.number = el.number;
    elementDiv.dataset.symbol = el.symbol;
    elementDiv.dataset.name = el.name;
    elementDiv.dataset.group = el.group;
    elementDiv.innerHTML = `
      <strong>${el.symbol}</strong><br>
      ${el.number}
    `;
    elementDiv.addEventListener("click", () => displayElementInfo(el));
    periodicTable.appendChild(elementDiv);
  });
}

function displayElementInfo(element) {
  clearSelection();
  const selectedElement = document.querySelector(`.element[data-number='${element.number}']`);
  selectedElement.classList.add("selected");

  elementName.textContent = `Name: ${element.name}`;
  elementSymbol.textContent = `Symbol: ${element.symbol}`;
  elementAtomicNumber.textContent = `Atomic Number: ${element.number}`;
  elementGroup.textContent = `Group: ${element.group}`;

  elementInfo.classList.remove("hidden");
}

function clearSelection() {
  document.querySelectorAll(".element").forEach((el) => el.classList.remove("selected"));
}

function searchElements() {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".element").forEach((el) => {
    const name = el.dataset.name.toLowerCase();
    const symbol = el.dataset.symbol.toLowerCase();
    const number = el.dataset.number;

    if (name.includes(query) || symbol.includes(query) || number.includes(query)) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", searchElements);

createTable();
