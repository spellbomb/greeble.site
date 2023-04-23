"use client";

import { useEffect, useState } from "react";
import styles from "./cam.module.css";
const Diff = require("diff");

enum STEP {
  SET_BASE_POEM,
  RECALL,
  RESULTS,
}

const generateDiffView = (base: string, guess: string) => {
  const originalPoem = base;
  const attempt = guess;
  let span = null;

  const diff = Diff.diffWords(originalPoem, attempt),
    fragment = document.createDocumentFragment();

  const newView = document.createDocumentFragment();

  diff.forEach((part: any) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? "red" : part.removed ? "grey" : "green";
    span = document.createElement("span");
    span.style.color = color;
    span.appendChild(document.createTextNode(part.value));
    fragment.appendChild(span);
  });

  newView.appendChild(fragment);
  return newView;
};

const SetPoem = ({
  referencePoem,
  setReferencePoem,
  setStep,
}: {
  referencePoem: string;
  setReferencePoem: (val: string) => void;
  setStep: (val: STEP) => void;
}) => {
  return (
    <div className={styles.greebleContainer}>
      <div className={styles.subHed}>Paste the full poem here.</div>
      <textarea
        className={styles.poemInput}
        value={referencePoem}
        onChange={(e) => setReferencePoem(e.target.value)}
        placeholder={`Even with insects—
some can sing,
    some can’t.`}
      ></textarea>
      <button onClick={() => setStep(STEP.RECALL)}>set base poem</button>
    </div>
  );
};

const GuessPoem = ({
  guess,
  setGuess,
  setStep,
}: {
  guess: string;
  setGuess: (val: string) => void;
  setStep: (val: STEP) => void;
}) => {
  return (
    <div className={styles.greebleContainer}>
      <div className={styles.subHed}>Can you recall the poem?</div>
      <textarea
        className={styles.poemInput}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      ></textarea>
      <button onClick={() => setStep(STEP.RESULTS)}>check results</button>
    </div>
  );
};

const ShowResults = ({
  guess,
  referencePoem,
  setStep,
}: {
  guess: string;
  referencePoem: string;
  setStep: (val: STEP) => void;
}) => {
  useEffect(() => {
    const newView = generateDiffView(referencePoem, guess);
    const diffNode = document.getElementById("diff");
    if (diffNode !== null) {
      diffNode.innerHTML = "";
    }
    diffNode?.append(newView);
  }, []);
  return (
    <div className={styles.greebleContainer}>
      here's how you did:
      <div
        className={styles.poemInput}
        style={{ background: "white" }}
        id="diff"
      ></div>
      <div style={{ display: "flex" }}>
        <button style={{ flexGrow: "1" }} onClick={() => setStep(STEP.RECALL)}>
          try again
        </button>
        <button
          style={{ flexGrow: "1" }}
          onClick={() => setStep(STEP.SET_BASE_POEM)}
        >
          change poem
        </button>
      </div>
    </div>
  );
};

const Cam = () => {
  const [step, setStep] = useState(STEP.SET_BASE_POEM);
  const [referencePoem, setReferencePoem] = useState("");
  const [guess, setGuess] = useState("");
  let component = null;

  useEffect(() => {
    // check to see if there's stored info
  }, []);

  switch (step) {
    case STEP.SET_BASE_POEM: {
      component = (
        <SetPoem
          referencePoem={referencePoem}
          setReferencePoem={setReferencePoem}
          setStep={setStep}
        />
      );
      break;
    }
    case STEP.RECALL: {
      component = (
        <GuessPoem guess={guess} setGuess={setGuess} setStep={setStep} />
      );
      break;
    }
    case STEP.RESULTS: {
      component = (
        <ShowResults
          guess={guess}
          referencePoem={referencePoem}
          setStep={setStep}
        />
      );
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div className={styles.container}>
      <h2 style={{ textAlign: "center" }}>Poetry memorizer</h2>
      {component}
    </div>
  );
};

export default Cam;
