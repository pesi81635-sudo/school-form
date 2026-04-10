<script>
let schools = [];
let selectedRedizo = null;

const input = document.getElementById("school-input");
const list = document.getElementById("school-suggestions");
const hidden = document.getElementById("school-redizo");

/* ✅ načtení JSON */
fetch("schools.json")
  .then(res => res.json())
  .then(data => {
    // doporučeno: jen aktivní školy
    schools = data.filter(s => s.active);
  });

/* ✅ našeptávání */
input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  list.innerHTML = "";
  selectedRedizo = null;
  hidden.value = "";

  if (query.length < 2) return;

  const matches = schools
    .filter(s => s.name.toLowerCase().includes(query))
    .slice(0, 10);

  matches.forEach(school => {
    const li = document.createElement("li");
    li.textContent = `${school.name} (${school.city})`;
    li.dataset.redizo = school.redizo;

    li.onclick = () => {
      input.value = school.name;
      selectedRedizo = school.redizo;
      hidden.value = school.redizo;
      list.innerHTML = "";
    };

    list.appendChild(li);
  });
});

/* ✅ ochrana proti ručnímu přepsání */
input.addEventListener("blur", () => {
  setTimeout(() => {
    if (!hidden.value) {
      input.value = "";
    }
  }, 200);
});

/* ✅ zavřít seznam při kliknutí mimo */
document.addEventListener("click", e => {
  if (!e.target.closest(".autocomplete-wrapper")) {
    list.innerHTML = "";
  }
});
</script>