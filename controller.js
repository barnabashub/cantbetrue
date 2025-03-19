let switches = [];

function addSwitch() {
  const name = prompt("Name of the switch button:");
  if (!name) return;

  const switchId = switches.length;
  const switchObj = { id: switchId, name, state: false, rules: {} };
  switches.push(switchObj);

  renderSwitches();
}

function toggleSwitch(id) {
  const switchObj = switches.find((s) => s.id === id);
  switchObj.state = !switchObj.state;
  applyRules(id);
  renderSwitches();
}

function applyRules(id) {
  const switchObj = switches.find((s) => s.id === id);
  Object.keys(switchObj.rules).forEach((targetId) => {
    const action = switchObj.rules[targetId][switchObj.state ? "on" : "off"];
    if (action === "on") switches[targetId].state = true;
    if (action === "off") switches[targetId].state = false;
  });
}

function setRule(sourceId, targetId, event, value) {
  if (!switches[sourceId].rules[targetId]) {
    switches[sourceId].rules[targetId] = { on: "none", off: "none" };
  }
  switches[sourceId].rules[targetId][event] = value;
}

function renderSwitches() {
  const switchList = document.getElementById("switchList");
  switchList.innerHTML = "";

  switches.forEach((switchObj, index) => {
    const div = document.createElement("div");
    div.className = "switch-container";

    const label = document.createElement("label");
    label.textContent = switchObj.name;

    const switchWrapper = document.createElement("label");
    switchWrapper.className = "switch";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = switchObj.state;
    input.onchange = () => toggleSwitch(index);

    const slider = document.createElement("span");
    slider.className = "slider";

    switchWrapper.appendChild(input);
    switchWrapper.appendChild(slider);

    const rulesDiv = document.createElement("div");
    rulesDiv.className = "rules";
    switches.forEach((target, targetIndex) => {
      if (targetIndex !== index) {
        const ruleOn = switchObj.rules[targetIndex]
          ? switchObj.rules[targetIndex]["on"]
          : "none";
        const ruleOff = switchObj.rules[targetIndex]
          ? switchObj.rules[targetIndex]["off"]
          : "none";
        rulesDiv.innerHTML += `${target.name} ha ON:
                            <select onchange="setRule(${index}, ${targetIndex}, 'on', this.value)">
                                <option value="none" ${
                                  ruleOn === "none" ? "selected" : ""
                                }>Semmi</option>
                                <option value="on" ${
                                  ruleOn === "on" ? "selected" : ""
                                }>Bekapcsol</option>
                                <option value="off" ${
                                  ruleOn === "off" ? "selected" : ""
                                }>Kikapcsol</option>
                            </select>
                            ha OFF:
                            <select onchange="setRule(${index}, ${targetIndex}, 'off', this.value)">
                                <option value="none" ${
                                  ruleOff === "none" ? "selected" : ""
                                }>Semmi</option>
                                <option value="on" ${
                                  ruleOff === "on" ? "selected" : ""
                                }>Bekapcsol</option>
                                <option value="off" ${
                                  ruleOff === "off" ? "selected" : ""
                                }>Kikapcsol</option>
                            </select><br>`;
      }
    });

    div.appendChild(label);
    div.appendChild(switchWrapper);
    div.appendChild(rulesDiv);
    rulesDiv.style.display = "block";
    switchList.appendChild(div);
  });
}

function toggleSettings() {
  const rulesDivs = document.querySelectorAll(".rules");
  rulesDivs.forEach((rulesDiv) => {
    if (rulesDiv.style.display === "none" || rulesDiv.style.display === "") {
      rulesDiv.style.display = "block";
    } else {
      rulesDiv.style.display = "none";
    }
  });
  const elements = ["webapptitle", "gameTitle", "newswitchbtn"];
  for (i in elements) {
    title = document.getElementById(elements[i]);
    if (title.style.display === "none" || title.style.display === "") {
      title.style.display = "block";
    } else {
      title.style.display = "none";
    }
  }
}

document.getElementById("gameTitle").addEventListener("input", function () {
  const title = document.getElementById("gameTitle").value;
  document.getElementById("dynamicTitle").textContent = title || "Játék címe";
});
