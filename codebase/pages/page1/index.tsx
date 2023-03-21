import { useEffect, useRef } from 'react';
import Component1 from './components/component1';
import Component10 from './components/component10';
import Component11 from './components/component11';
import Component12 from './components/component12';
import Component13 from './components/component13';
import Component14 from './components/component14';
import Component15 from './components/component15';
import Component16 from './components/component16';
import Component17 from './components/component17';
import Component18 from './components/component18';
import Component19 from './components/component19';
import Component2 from './components/component2';
import Component20 from './components/component20';
import Component3 from './components/component3';
import Component4 from './components/component4';
import Component5 from './components/component5';
import Component6 from './components/component6';
import Component7 from './components/component7';
import Component8 from './components/component8';
import Component9 from './components/component9';
import styles from './index.module.css';

export default function () {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    console.log(process.env.APP_START);
    const start = Number(
      process?.env?.APP_START || import.meta?.env?.APP_START
    );
    const end = Date.now();
    const duration = (end - start) / 1000;
    console.log('----------------------------------------');
    console.log(`dev-server started in ${duration} seconds`);
    console.log('----------------------------------------');
  }, []);
  return (
    <div className={styles.root}>
      <Component1 />
      <Component2 />
      <Component3 />
      <Component4 />
      <Component5 />
      <Component6 />
      <Component7 />
      <Component8 />
      <Component9 />
      <Component10 />
      <Component11 />
      <Component12 />
      <Component13 />
      <Component14 />
      <Component15 />
      <Component16 />
      <Component17 />
      <Component18 />
      <Component19 />
      <Component20 />
    </div>
  );
}
