document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-nav');
      menu.textContent = open ? '×' : '☰';
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('mobile-nav');
      menu.textContent = '☰';
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  const topBtn = document.createElement('button');
  topBtn.className = 'back-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '↑';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const revealItems = document.querySelectorAll('section, .problem-card, .service, .resource, .person, .info-card');
  revealItems.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
  }, {threshold:0.12});
  revealItems.forEach(el => observer.observe(el));

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY/max)*100}%` : '0%';
    topBtn.classList.toggle('visible', window.scrollY > 500);
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
});

function demoForm(e){
  e.preventDefault();
  const s=document.querySelector('.success');
  if(s)s.textContent='Thank you. Your enquiry has been received on this demo website.';
  e.target.reset();
  return false;
}
