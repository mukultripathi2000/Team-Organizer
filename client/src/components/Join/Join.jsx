import React from 'react';
import './Join.css';
import HeaderJoin from './HeaderJoin';
import Footer from '../Footer/Footer';

export default function Join() {
  return (<>
    <div className="join">
      <HeaderJoin />
      <h1>A dashboard to organize your team's task</h1>
      <h1>Keep all your tasks from different teams at one place</h1>
      <h1>Create or Join a new team</h1>


      {/* <img
        className="div1"
        src="/images/join1.png"
        alt="Keep all your tasks in one place"
      />
      <img className="div2" src="/images/join2.png" alt="" />
      <img className="div1" src="/images/join3.png" alt="" /> */}
      
    </div>
    <Footer />
    </>
  );
}
