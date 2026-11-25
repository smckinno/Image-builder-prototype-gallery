document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .version-bar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 24px;background:#f5f5f5;border-bottom:1px solid #d2d2d2;font:14px Arial,sans-serif}
    .version-bar button{padding:9px 14px;border:1px solid #8a8d90;border-radius:4px;background:#fff;color:#151515;cursor:pointer}
    .version-bar button[aria-pressed="true"]{background:#06c;border-color:#06c;color:#fff}
    .version-bar button:focus-visible{outline:3px solid #73bcf7;outline-offset:2px}
    #results .suggestion-intro{display:block!important;padding:0 18px 22px;border-bottom:1px solid #d2d2d2;font-size:16px;line-height:1.5}
    #results .flyout-doc-section{padding:12px 0 26px;margin:0;font-size:16px}
    #results .flyout-divider{display:block;height:1px;min-height:1px;border:0;background:#c7c7c7;margin:0 -20px 20px;width:calc(100% + 40px)}
    #results .flyout-divider[hidden]{display:none!important}
    body.option-two #results .recommendation-toggle{border-bottom:1px solid #c7c7c7!important;padding-bottom:22px!important;margin-bottom:14px!important}
    #results .flyout-doc-section a{color:#06c;text-decoration:underline;text-underline-offset:3px}
    .picker-layout{max-width:min(930px,calc((100vw - 110px) * .56))!important;grid-template-columns:190px minmax(0,1fr)!important}
    .type-button{width:190px!important}
    #results .recommendations{width:min(600px,calc((100vw - 110px) * .44))!important;left:calc(100% + 8px)!important;right:auto!important;top:0!important;margin:0!important}
    @media(max-width:900px){.picker-layout{max-width:100%!important;grid-template-columns:1fr!important}#results .recommendations{width:100%!important;left:0!important;top:100%!important}.type-button{width:100%!important}}
  `;
  document.head.append(style);
  const bar=document.createElement('nav');
  bar.className='version-bar';
  bar.setAttribute('aria-label','Compare link placement');
  bar.innerHTML='<strong>Package suggestions</strong><button type="button" aria-pressed="true">Option 1: Link in main menu</button><button type="button" aria-pressed="false">Option 2: Link in flyout</button>';
  document.body.prepend(bar);
  const intro=document.getElementById('suggestion-intro');
  const link=intro.querySelector('a');
  const explanation=document.createElement('p');
  explanation.textContent='Suggestions are optional. Image Builder resolves dependencies when it builds your image.';
  explanation.style.cssText='margin:0 0 22px;color:#555;line-height:1.5';
  const flyout=document.getElementById('recommendations');
  const section=document.createElement('div');
  section.className='flyout-doc-section';
  section.hidden=true;
  flyout.querySelector('ul').before(section);
  const divider=document.createElement('hr');
  divider.className='flyout-divider';
  divider.hidden=true;
  section.after(divider);
  const buttons=[...bar.querySelectorAll('button')];
  function choose(index){
    document.body.classList.toggle('option-two',index===1);
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(index===i)));
    section.hidden=index===0;
    divider.hidden=index===0;
    if(index===1){
      intro.style.setProperty('display','none','important');
      section.append(explanation,link);
    }else{
      intro.style.removeProperty('display');
      intro.append(link);
      explanation.remove();
    }
  }
  buttons.forEach((button,index)=>button.addEventListener('click',()=>choose(index)));
});
