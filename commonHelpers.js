import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as p,i as n}from"./assets/vendor-77e16229.js";const e=document.querySelector("[data-start]"),h=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),C=document.querySelector("[data-seconds]"),a=document.querySelector("#datetime-picker");let i=null,u=null,d=null;e.disabled=!0;const T={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0].getTime()<Date.now()?n.error({message:"Будь-ласка, оберіть час у майбутньому",position:"bottomCenter"}):(u=t[0].getTime(),e.disabled=!1,n.success({message:'Натисніть кнопку "Start"',position:"bottomCenter"}))}};function g(t){const l=o(Math.floor(t/864e5)),m=o(Math.floor(t%864e5/36e5)),f=o(Math.floor(t%864e5%36e5/6e4)),y=o(Math.floor(t%864e5%36e5%6e4/1e3));return{days:l,hours:m,minutes:f,seconds:y}}function D(){e.disabled=!0,a.disabled=!1,clearInterval(i)}function q(){i=setInterval(()=>{d=Date.now();const t=u-d;M(g(t)),e.disabled=!0,a.disabled=!0,t<=1e3&&(D(),n.success({message:"Відлік завершено",position:"bottomCenter"}))},1e3)}function M({days:t,hours:r,minutes:s,seconds:c}){h.textContent=`${t}`,b.textContent=`${r}`,S.textContent=`${s}`,C.textContent=`${c}`}function o(t){return String(t).padStart(2,"0")}p(a,T);e.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
