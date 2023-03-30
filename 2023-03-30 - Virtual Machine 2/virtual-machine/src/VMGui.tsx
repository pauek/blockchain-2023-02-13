import { useEffect, useState } from "react";
import { assemble } from "./vm/assembler";
import { testIf1, testLoop1, testMayor, testXor } from "./vm/programs";
import { virtualMachine } from "./vm/vm";

function VMGui() {
  const [snapshot, setSnapshot] = useState(virtualMachine.snapshot());
  const [output, setOutput] = useState("");

  useEffect(() => {
    virtualMachine.load(assemble(testLoop1));
    virtualMachine.setOutputFunc((val) => {
      setOutput((prevOutput) => prevOutput + `${val}\n`);
    });
    setSnapshot(virtualMachine.snapshot());
  }, []);

  const step = () => {
    virtualMachine.step();
    setSnapshot(virtualMachine.snapshot());
  };

  const run = () => {
    const res = virtualMachine.run();
    setSnapshot(virtualMachine.snapshot());
  };

  const reset = () => {
    virtualMachine.reset();
    setOutput("");
    setSnapshot(virtualMachine.snapshot());
  };

  return (
    <div className="App">
      <div>{snapshot.status}</div>
      <div>
        {snapshot.code.map((byte, i) => (
          <span key={i} className={"byte" + (i === snapshot.ip ? " curr" : "")}>
            {byte}
          </span>
        ))}
      </div>
      <div>
        stack: <code>{JSON.stringify(snapshot.stack)}</code>
      </div>
      <button onClick={step}>Step</button>
      <button onClick={run}>Run</button>
      <button onClick={reset}>Reset</button>
      <pre className="output">{output}</pre>
    </div>
  );
}

export default VMGui;
