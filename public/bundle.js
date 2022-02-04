(()=>{"use strict";const t=class{constructor(t,e,s,i=s,r="#000000"){this.x=t,this.y=e,this.width=s,this.height=i,this.color=r}draw(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}},e=class extends t{constructor(t,e,s,i){super(t,e,s,i),this.isVisible=!0}draw(t,e){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=e,t.fill(),t.closePath()}},s=document.getElementById("myCanvas"),i=s.getContext("2d"),r=s.width,h=s.height,o=new class extends t{constructor(t,e,s,i,r=15,h="#000000"){super(t,e,0,0,h),this.radius=r,this.xSpeed=s,this.ySpeed=i}draw(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}}(r/2,h-55,3.5+Math.random()-.5,-3.5+Math.random()-.5),l=new class extends t{constructor(t,e,s,i,r,h){super(t,e,s,i,h),this.speed=r,this.color=h}}((r-75)/2,h-10,75,10,7,`rgb(${(r-75)/2*(255/r)}, 0, 0)`),d=new class{constructor(t,e,s){this.width=t,this.height=e,this.color=s}draw(t){t.beginPath(),t.rect(0,0,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}}(r,h,"#cdcdcd");let n=51,c=!1,a=!1;const y=new class{constructor(t,e){this.x=t,this.y=e,this.score=0,this.font="16px Ariel",this.color="#000000"}draw(t){t.font=this.font,t.fillStyle=this.color,t.fillText(`Score: ${this.score}`,this.x,this.y)}increment(t=1){this.score+=t}reset(){this.score=0}}(8,20),x=new class{constructor(t,e,s){this.x=t,this.y=e,this.startingLives=s,this.lives=s,this.font="16px Ariel",this.color="#000000"}draw(t){t.font=this.font,t.fillStyle=this.color,t.fillText(`Lives: ${this.lives}`,this.x,this.y)}decrement(t=1){this.lives-=t}reset(){this.lives=this.startingLives}}(r-65,20,2),w=(()=>{const t=[];for(let s=0;s<5;s+=1){t[s]=[];for(let i=0;i<3;i+=1){const r=85*s+30,h=30*i+30;t[s][i]=new e(r,h,75,20)}}return t})(),u=()=>{d.draw(i),o.draw(i),l.draw(i),(()=>{for(let t=0;t<5;t+=1){for(let e=0;e<3;e+=1)w[t][e].isVisible&&w[t][e].draw(i,`rgb(${n}, 0, 0)`);n+=51}n=51})(),y.draw(i),x.draw(i),(o.x+o.radius/2>=r-o.radius/2||o.x-o.radius/2<=0+o.radius/2)&&(o.xSpeed*=-1),o.y-o.radius/2<=0+o.radius/2?o.ySpeed*=-1:o.y+o.radius/2>=h-o.radius/2&&(o.x>l.x&&o.x<l.x+l.width?o.ySpeed*=-1:0===x.lives?(alert("GAME OVER"),document.location.reload(),cancelAnimationFrame()):(o.x=r/2,o.y=h-55,o.xSpeed=3.5+Math.random()-.5,o.ySpeed=-3.5+Math.random()-.5,x.decrement(1))),o.x+=o.xSpeed,o.y+=o.ySpeed,!c||l.x+l.width/2>r-l.width/2?!a||l.x<0||(l.x-=l.speed):l.x+=l.speed,(()=>{for(let t=0;t<w.length;t+=1)for(let e=0;e<w[t].length;e+=1){const s=w[t][e];s.isVisible&&o.x>s.x&&o.x<s.x+75&&o.y>s.y&&o.y<s.y+20&&(o.ySpeed*=-1,w[t][e].isVisible=!1,y.increment(1),15===y.score&&(alert("You win, congrats!"),document.location.reload()))}})(),setTimeout((()=>{requestAnimationFrame(u)}),12.5)};document.addEventListener("keydown",(t=>{"Right"===t.key||"ArrowRight"===t.key?c=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(a=!0)})),document.addEventListener("keyup",(t=>{"Right"===t.key||"ArrowRight"===t.key?c=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(a=!1)})),document.addEventListener("mousemove",(t=>{const e=t.clientX-s.offsetLeft;e>0&&e<r&&(l.x=e-l.width/2,l.color=`rgb(${l.x*(255/r)}, 0, 0)`)})),u()})();