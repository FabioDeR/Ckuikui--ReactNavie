import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import DisplayComponent from "./displayComponent";
import BtnComponent from "./BtnComponent";

function Timer(props) {
  const [time, setTime] = useState({ ms: 2, s: 2, m: 0, h: 0 });

  //useState === this.state et setstate en un
  const [IdIng, setIdIng] = useState(props.route.params?.params.IdIng);
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const [data, setData] = useState();

  //comme componentDimount, [] mettre changement statue
  useEffect((_) => {
    getTimer();
  }, []);

  const getTimer = async () => {
    await fetch("http://192.168.0.5:9000/ingredients/" + IdIng)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data?.Timers[0].time);
        transforTimer(data.data?.Timers[0].time);
      });
  };

  const transforTimer = (dataTimer) => {
    const milliseconde = dataTimer % 1000;
    const seconde = ((dataTimer - milliseconde) / 1000) % 60;
    const minute = (((dataTimer - milliseconde) / 1000 - seconde) / 60) % 60;
    const heure =
      ((((dataTimer - milliseconde) / 1000 - seconde) / 60 - minute) / 60) % 60;
    setTime({ ms: milliseconde, s: seconde, m: minute, h: heure });
  };

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, -10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedH === 0 && updatedM === 0 && updatedS === 0 && updatedMs === 0) {
      return stop();
    }

    if (updatedM === 0) {
      if (updatedH > 0) {
        updatedH--;
        updatedM = 59;
      }
    }
    if (updatedS === 0) {
      if (updatedM > 0) {
        updatedM--;
        updatedS = 59;
      }
    }
    if (updatedMs === 0) {
      if (updatedS > 0) {
        updatedS--;
        updatedMs = 59;
      }
    }
    updatedMs--;

    // if (updatedM === 60) {
    //   updatedH++;
    //   updatedM = 0;
    // }
    // if (updatedS === 60) {
    //   updatedM++;
    //   updatedS = 0;
    // }
    // if (updatedMs === 100) {
    //   updatedS++;
    //   updatedMs = 0;
    // }
    // updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };
  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    transforTimer(data);
  };

  const resume = () => start();
  return (
    <View style={styles.main_container}>
      <DisplayComponent time={time} />
      <BtnComponent
        status={status}
        resume={resume}
        reset={reset}
        stop={stop}
        start={start}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
export default Timer;
