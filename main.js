document.getElementById('yr').textContent=new Date().getFullYear();
// Lorenz attractor: a nonlinear dynamical system, drawn as the hero backdrop
(function(){
  var c=document.getElementById('att');if(!c)return;var x=c.getContext('2d'),W,H;
  function size(){var r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;W=c.width=r.width*d;H=c.height=r.height*d;x.clearRect(0,0,W,H)}
  size();window.addEventListener('resize',size);
  var p=[[1,1,1],[1.02,1,1]],col=['#6d4ad1','#1fa39a'];
  var s=10,r=28,b=8/3,dt=.006,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function pt(q){var k=Math.min(W,H)/48;return[W*.62+q[0]*k*1.1,H*.55-(q[2]-25)*k*1.1]}
  function step(){
    p.forEach(function(q,i){
      var a=pt(q);
      var dx=s*(q[1]-q[0]),dy=q[0]*(r-q[2])-q[1],dz=q[0]*q[1]-b*q[2];
      q[0]+=dx*dt;q[1]+=dy*dt;q[2]+=dz*dt;
      var n=pt(q);x.strokeStyle=col[i];x.lineWidth=1.4;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(n[0],n[1]);x.stroke();
    });
  }
  if(reduce){for(var i=0;i<9000;i++)step();return}
  var f=0;(function loop(){for(var i=0;i<6;i++)step();if(++f%9==0){x.fillStyle=getComputedStyle(document.body).backgroundColor;x.globalAlpha=.035;x.fillRect(0,0,W,H);x.globalAlpha=1}requestAnimationFrame(loop)})();
})();
