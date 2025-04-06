let switches = [];
let settingsVisible = true;

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

    const label = document.createElement("label");
    label.textContent = switchObj.name;

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
        rulesDiv.innerHTML += `set ${target.name} if this is ON to:
                            <select onchange="setRule(${index}, ${targetIndex}, 'on', this.value)">
                                <option value="none" ${
            ruleOn === "none" ? "selected" : ""
        }>Nothing</option>
                                <option value="on" ${
            ruleOn === "on" ? "selected" : ""
        }>On</option>
                                <option value="off" ${
            ruleOn === "off" ? "selected" : ""
        }>Off</option>
                            </select>
                            if this is OFF to:
                            <select onchange="setRule(${index}, ${targetIndex}, 'off', this.value)">
                                <option value="none" ${
            ruleOff === "none" ? "selected" : ""
        }>Nothing</option>
                                <option value="on" ${
            ruleOff === "on" ? "selected" : ""
        }>On</option>
                                <option value="off" ${
            ruleOff === "off" ? "selected" : ""
        }>Off</option>
                            </select><br>`;
      }
    });

    div.appendChild(switchWrapper);
    div.appendChild(label);
    div.appendChild(rulesDiv);
    if (settingsVisible) {
      rulesDiv.style.display = "block";
    } else {
      rulesDiv.style.display = "none";
    }
    switchList.appendChild(div);
  });
}

function toggleSettings() {
  settingsVisible = !settingsVisible;
  const displayStyle = settingsVisible ? "block" : "none";

  const rulesDivs = document.querySelectorAll(".rules");
  rulesDivs.forEach((rulesDiv) => {
    rulesDiv.style.display = displayStyle;
  });

  const elements = ["webapptitle", "gameTitle", "newswitchbtn"];
  elements.forEach((elementId) => {
    const element = document.getElementById(elementId);
    element.style.display = displayStyle;
  });
}

document.getElementById("gameTitle").addEventListener("input", function () {
  const title = document.getElementById("gameTitle").value;
  document.getElementById("dynamicTitle").textContent = title || "Game";
});
