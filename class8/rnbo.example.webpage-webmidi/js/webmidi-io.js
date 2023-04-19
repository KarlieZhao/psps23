let rnbo_device;
document.getElementById('midiin-select').addEventListener('change', changeMidiIn);
document.getElementById('midiout-select').addEventListener('change', changeMidiOut);

function changeMidiIn(){
  const inportmenu = document.getElementById('midiin-select');
  const name = inportmenu.options[inportmenu.selectedIndex].value;
  let midiPort = 0;
  console.log("using input port: "+name)
  const midiInput = WebMidi.getInputByName(name);

  midiInput.addListener("noteon", e => {
    console.log("noteon "+e.message.data);
    // let noteOnEvent = new MIDIEvent(TimeNow, midiPort, e.message.data);
    let noteOnEvent = new RNBO.MIDIEvent(rnbo_device.context.currentTime * 1000, midiPort, e.message.data);
    rnbo_device.scheduleEvent(noteOnEvent);
  });

  midiInput.addListener("noteoff", e => {
    console.log("noteoff "+e.message.data);
    // let noteOffEvent = new MIDIEvent(TimeNow, midiPort, e.message.data);
    let noteOffEvent = new RNBO.MIDIEvent(rnbo_device.context.currentTime * 1000, midiPort, e.message.data);
    rnbo_device.scheduleEvent(noteOffEvent);
  });
}

function changeMidiOut(){
  const outportmenu = document.getElementById('midiout-select');
  const name = outportmenu.options[outportmenu.selectedIndex].value;
  // let midiPort = 0;
  console.log("using output port: "+name)
  const midiInput = WebMidi.getOutputByName(name);
}

function webMIDIstart(device){
  console.log("start webmidi");
  rnbo_device = device;
  const inportmenu = document.getElementById('midiin-select');
  const inporterror = document.getElementById('midiin-error');
  const outportmenu = document.getElementById('midiout-select');
  const outporterror = document.getElementById('midiout-error');
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
    inporterror.innerHTML+= "No midi inputs detected.";
  } else {
    WebMidi.inputs.forEach((mdevice, index) => {
      // document.body.innerHTML+= `${index}: ${mdevice.name} <br>`;
      // inportmenu.push(device.name);
      console.log("in port "+mdevice.name)
      // inportmenu[index] = new Option(mdevice.name);
      const option = document.createElement("option");
      option.text = mdevice.name;
      inportmenu.add(option);
    });
  }
  // Display available MIDI output devices
  if (WebMidi.outputs.length < 1) {
    outporterror.innerHTML+= "No device detected.";
  } else {
    WebMidi.outputs.forEach((mdevice, index) => {
      // document.body.innerHTML+= `${index}: ${mdevice.name} <br>`;
      // inportmenu.push(device.name);
      console.log("out port "+mdevice.name)
      // inportmenu[index] = new Option(mdevice.name);
      const option = document.createElement("option");
      option.text = mdevice.name;
      outportmenu.add(option);
    });
  }

}
