       // Theme Toggle Logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const rootElement = document.documentElement;
        
        function updateThemeIcon(theme) {
    themeToggleBtn.textContent = theme === "dark" ? "Dawn" : "Dark";
        }

        const savedTheme = localStorage.getItem('theme') || 'light';
    rootElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

    rootElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateThemeIcon(targetTheme);
});

        // Scroll Fade-in Animation using Intersection Observer
        const faders = document.querySelectorAll('.fade-in');
        
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });

        // 🔥 ACTIVE NAV HIGHLIGHT ON SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
            a.classList.add("active");
        }
    });
});

// EMAIL SUBMIT


function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("contactForm");
  const button = document.getElementById("contactBtn");
  const popup = document.getElementById("miniPopup");
  const message = document.getElementById("popupMessage");

  const data = new FormData(form);

  button.innerText = "Sending...";

  fetch(form.action, {
    method: "POST",
    body: data
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      showPopup(" I've Recieved You Message !");
    } else {
      showPopup("Failed to send message");
    }
  })
  .catch(() => {
    showPopup(" Error sending message");
  })
  .finally(() => {
    button.innerText = "Send Message";
  });

  function showPopup(text) {
    message.innerText = text;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2500);
  }
}