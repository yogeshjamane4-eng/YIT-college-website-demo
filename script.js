/* =========================================================
   YOGESH INSTITUTE OF TECHNOLOGIES (YIT)
   Main JavaScript
   Vanilla JavaScript - No Framework
   ========================================================= */


/* =========================================================
   1. BASIC ELEMENTS
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const navLinks = document.querySelectorAll(".nav-link");

const backTop = document.getElementById("backTop");
const toast = document.getElementById("toast");

const currentYear = document.getElementById("year");


/* =========================================================
   2. CURRENT YEAR
   ========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   3. MOBILE HAMBURGER MENU
   ========================================================= */

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  // Close menu when a navigation link is clicked
  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");
      menuToggle.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

    });

  });

}


/* =========================================================
   4. SMOOTH SCROLLING
   ========================================================= */

navLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================================
   5. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {

          const linkTarget = link.getAttribute("href");

          link.classList.toggle(
            "active",
            linkTarget === `#${currentId}`
          );

        });

      }

    });

  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* =========================================================
   6. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   7. COURSE MODAL
   ========================================================= */

const courseModal = document.getElementById("courseModal");

const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const modalDuration = document.getElementById("modalDuration");
const modalLevel = document.getElementById("modalLevel");

const modalEnquire = document.getElementById("modalEnquire");

const courseButtons = document.querySelectorAll(
  ".course-button"
);


/*
   Course information.

   This is demo data.
   You can change these values later.
*/

const courseData = {

  "PCMC / Science": {
    description:
      "A science-focused foundation covering Physics, Chemistry, Mathematics and Computer Science for higher studies and competitive preparation.",
    duration: "2 Years",
    level: "11th - 12th"
  },

  "Computer Science": {
    description:
      "Learn programming fundamentals, problem solving, algorithms, data structures and computer concepts.",
    duration: "2 Years",
    level: "Foundation"
  },

  "Web Development": {
    description:
      "Learn how modern websites are created using HTML, CSS and JavaScript with responsive design principles.",
    duration: "6 Months",
    level: "Beginner"
  },

  "Python Programming": {
    description:
      "Build a strong Python programming foundation through practical coding, logic building and small projects.",
    duration: "6 Months",
    level: "Beginner"
  },

  "Artificial Intelligence": {
    description:
      "Explore the foundations of Artificial Intelligence, machine learning concepts and real-world applications.",
    duration: "8 Months",
    level: "Intermediate"
  },

  "Data Science": {
    description:
      "Understand data analysis, visualization, statistics and introductory data science workflows.",
    duration: "8 Months",
    level: "Intermediate"
  },

  "Cyber Security": {
    description:
      "Learn cybersecurity fundamentals, digital safety, networks, security concepts and ethical practices.",
    duration: "8 Months",
    level: "Intermediate"
  }

};


/* ---------- Open Modal ---------- */

function openCourseModal(courseName) {

  const course = courseData[courseName];

  if (!course) {
    showToast("Course information is currently unavailable.");
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = courseName;
  }

  if (modalDescription) {
    modalDescription.textContent = course.description;
  }

  if (modalDuration) {
    modalDuration.textContent = course.duration;
  }

  if (modalLevel) {
    modalLevel.textContent = course.level;
  }

  if (courseModal) {

    courseModal.classList.add("show");

    courseModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

  }

}


/* ---------- Close Modal ---------- */

function closeCourseModal() {

  if (!courseModal) {
    return;
  }

  courseModal.classList.remove("show");

  courseModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


/* ---------- Course Buttons ---------- */

courseButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const courseName = button.dataset.course;

    openCourseModal(courseName);

  });

});


/* ---------- Close Button ---------- */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeCourseModal
  );

}


/* ---------- Click Outside Modal ---------- */

if (courseModal) {

  courseModal.addEventListener("click", (event) => {

    if (
      event.target.hasAttribute("data-close-modal")
    ) {
      closeCourseModal();
    }

  });

}


/* ---------- Escape Key ---------- */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeCourseModal();
  }

});


/* =========================================================
   8. MODAL → ADMISSION FORM
   ========================================================= */

if (modalEnquire) {

  modalEnquire.addEventListener("click", () => {

    const selectedCourse = modalTitle
      ? modalTitle.textContent
      : "";

    closeCourseModal();

    const admissionSection =
      document.getElementById("admissions");

    const courseSelect =
      document.getElementById("studentCourse");

    if (admissionSection) {

      admissionSection.scrollIntoView({
        behavior: "smooth"
      });

    }

    // Automatically select the course
    if (courseSelect && selectedCourse) {

      const matchingOption =
        Array.from(courseSelect.options).find(
          (option) =>
            option.textContent.trim() ===
            selectedCourse.trim()
        );

      if (matchingOption) {
        courseSelect.value = matchingOption.value;
      }

    }

  });

}


/* =========================================================
   9. TOAST MESSAGE
   ========================================================= */

let toastTimer;

function showToast(message) {

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3200);

}


/* =========================================================
   10. ADMISSION FORM VALIDATION
   ========================================================= */

const admissionForm =
  document.getElementById("admissionForm");

const admissionMessage =
  document.getElementById("admissionMessage");


if (admissionForm) {

  admissionForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const studentName =
        document.getElementById("studentName");

      const studentEmail =
        document.getElementById("studentEmail");

      const studentPhone =
        document.getElementById("studentPhone");

      const studentCourse =
        document.getElementById("studentCourse");

      const qualification =
        document.getElementById("qualification");


      /* ---------- Required Fields ---------- */

      if (
        !studentName.value.trim() ||
        !studentEmail.value.trim() ||
        !studentPhone.value.trim() ||
        !studentCourse.value ||
        !qualification.value.trim()
      ) {

        showFormMessage(
          admissionMessage,
          "Please fill all required fields.",
          "error"
        );

        return;
      }


      /* ---------- Email Validation ---------- */

      if (!isValidEmail(studentEmail.value)) {

        showFormMessage(
          admissionMessage,
          "Please enter a valid email address.",
          "error"
        );

        studentEmail.focus();

        return;
      }


      /* ---------- Phone Validation ---------- */

      const phoneNumber =
        studentPhone.value.replace(/\D/g, "");

      if (phoneNumber.length < 10) {

        showFormMessage(
          admissionMessage,
          "Please enter a valid phone number.",
          "error"
        );

        studentPhone.focus();

        return;
      }


      /* ---------- Success ---------- */

      showFormMessage(
        admissionMessage,
        "Demo enquiry submitted successfully.",
        "success"
      );

      showToast(
        "Demo enquiry submitted successfully."
      );

      admissionForm.reset();

    }
  );

}


/* =========================================================
   11. CONTACT FORM
   ========================================================= */

const contactForm =
  document.getElementById("contactForm");

const contactMessage =
  document.getElementById("contactMessage");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const contactName =
        document.getElementById("contactName");

      const contactEmail =
        document.getElementById("contactEmail");

      const contactText =
        document.getElementById("contactText");


      /* ---------- Required Fields ---------- */

      if (
        !contactName.value.trim() ||
        !contactEmail.value.trim() ||
        !contactText.value.trim()
      ) {

        showFormMessage(
          contactMessage,
          "Please fill all required fields.",
          "error"
        );

        return;
      }


      /* ---------- Email ---------- */

      if (!isValidEmail(contactEmail.value)) {

        showFormMessage(
          contactMessage,
          "Please enter a valid email address.",
          "error"
        );

        contactEmail.focus();

        return;
      }


      /* ---------- Success ---------- */

      showFormMessage(
        contactMessage,
        "Demo message submitted successfully.",
        "success"
      );

      showToast(
        "Demo message submitted successfully."
      );

      contactForm.reset();

    }
  );

}


/* =========================================================
   12. FORM HELPER FUNCTIONS
   ========================================================= */

function isValidEmail(email) {

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email.trim());

}


function showFormMessage(
  element,
  message,
  type
) {

  if (!element) {
    return;
  }

  element.textContent = message;

  element.className =
    `form-message ${type}`;

}


/* =========================================================
   13. DEMO BUTTONS
   ========================================================= */

const demoButtons =
  document.querySelectorAll("[data-demo]");


demoButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const message =
      button.dataset.demo ||
      "This is a demo feature.";

    showToast(message);

  });

});


/* =========================================================
   14. ACHIEVEMENT COUNTERS
   ========================================================= */

const statNumbers =
  document.querySelectorAll("[data-target]");

let countersStarted = false;


function animateCounters() {

  if (countersStarted) {
    return;
  }

  countersStarted = true;

  statNumbers.forEach((counter) => {

    const target =
      Number(counter.dataset.target);

    const suffix =
      counter.dataset.suffix || "";

    const duration = 1600;

    const startTime =
      performance.now();


    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      /*
        Ease-out effect:
        Starts quickly and slows near the end.
      */

      const eased =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        Math.floor(target * eased);

      counter.textContent =
        currentValue.toLocaleString() + suffix;


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        counter.textContent =
          target.toLocaleString() + suffix;

      }

    }


    requestAnimationFrame(updateCounter);

  });

}


/* ---------- Counter Observer ---------- */

const statsSection =
  document.getElementById("achievements");


if (statsSection) {

  const statsObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            animateCounters();

            statsObserver.disconnect();

          }

        });

      },
      {
        threshold: 0.25
      }
    );

  statsObserver.observe(statsSection);

}


/* =========================================================
   15. BACK TO TOP BUTTON
   ========================================================= */

window.addEventListener(
  "scroll",
  () => {

    if (!backTop) {
      return;
    }

    if (window.scrollY > 500) {

      backTop.classList.add("show");

    } else {

      backTop.classList.remove("show");

    }

  },
  {
    passive: true
  }
);


if (backTop) {

  backTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   16. ESCAPE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {

  if (
    !mainNav ||
    !menuToggle
  ) {
    return;
  }

  const clickedInsideMenu =
    mainNav.contains(event.target);

  const clickedToggle =
    menuToggle.contains(event.target);

  if (
    mainNav.classList.contains("open") &&
    !clickedInsideMenu &&
    !clickedToggle
  ) {

    mainNav.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }

});


/* =========================================================
   17. CONSOLE MESSAGE
   ========================================================= */

console.log(
  "%cYIT Website Loaded Successfully 🚀",
  "font-size:16px;font-weight:bold;"
);

console.log(
  "Yogesh Institute of Technologies - Demo Website"
);