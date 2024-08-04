
document.querySelectorAll('.editable').forEach(element => {
  const savedData = localStorage.getItem(element.className + element.innerText);
  if (savedData) {
    element.innerText = savedData;
  }

  element.addEventListener('input', function () {
    localStorage.setItem(element.className + element.innerText, element.innerText);
  });
});

document.getElementById('downloadPdf').addEventListener('click', function () {
  const {
    jsPDF
  } = window.jspdf;
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const textWidth = pageWidth - margin * 2;

  doc.setFontSize(20);
  doc.text("Resume", margin, 20);

  const avatarImg = document.querySelector('.profile__avatar');
  const avatarBase64 = getBase64Image(avatarImg);
  doc.addImage(avatarBase64, 'PNG', margin, 30, 40, 40);

  const profileName = document.querySelector('.profile__name').innerText;
  const profileDescription = document.querySelector('.profile__description').innerText;
  doc.setFontSize(16);
  doc.text(profileName, margin + 50, 40);
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(profileDescription, textWidth), margin + 50, 50);


  const educationTitle = document.querySelector('.education__title').innerText;
  doc.setFontSize(14);
  doc.text(educationTitle, margin, 70);

  const educationItems = document.querySelectorAll('.course__item');
  let yOffset = 80;

  educationItems.forEach(item => {
    const year = item.querySelector('.course__year').innerText;
    const title = item.querySelector('.course__title').innerText;
    const description = item.querySelector('.course__description').innerText;

    doc.setFontSize(12);
    doc.text(`${year} - ${title}`, margin, yOffset);
    yOffset += 10;
    doc.text(doc.splitTextToSize(description, textWidth), margin, yOffset);
    yOffset += 10;
  });

  const interestsTitle = document.querySelector('.interests__title').innerText;
  doc.setFontSize(14);
  doc.text(interestsTitle, margin, yOffset + 10);
  yOffset += 20;

  const interestsItems = document.querySelectorAll('.interests__item');
  let interestsText = "";
  interestsItems.forEach(item => {
    interestsText += item.innerText + ", ";
  });
  interestsText = interestsText.slice(0, -2);
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(interestsText, textWidth), margin, yOffset);

  yOffset += 20;
  const contactTitle = document.querySelector('.contact__title').innerText;
  const contactEmail = document.querySelector('.contact__link[href^="mailto:"]').innerText;
  const contactPhone = document.querySelector('.contact__link[href^="tel:"]').innerText;
  doc.setFontSize(14);
  doc.text(contactTitle, margin, yOffset);
  doc.setFontSize(12);
  doc.text(`Email: ${contactEmail}`, margin, yOffset + 10);
  doc.text(`Phone: ${contactPhone}`, margin, yOffset + 20);

  yOffset += 30;
  const toolsTitle = document.querySelector('.tools__title').innerText;
  doc.setFontSize(14);
  doc.text(toolsTitle, margin, yOffset);
  yOffset += 10;

  const toolItems = document.querySelectorAll('.tools__item');
  let toolsText = "";
  toolItems.forEach(item => {
    const toolAltText = item.querySelector('.tools__img').alt;
    toolsText += toolAltText + ", ";
  });
  toolsText = toolsText.slice(0, -2);
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(toolsText, textWidth), margin, yOffset);

  yOffset += 20;
  const experienceTitle = document.querySelector('.experience__heading').innerText;
  doc.setFontSize(14);
  doc.text(experienceTitle, margin, yOffset);
  yOffset += 10;

  const experienceContainers = document.querySelectorAll('.experience__container');
  experienceContainers.forEach(container => {
    const year = container.querySelector('.experience__year').innerText;
    const title = container.querySelector('.experience__title').innerText;
    const subtitle = container.querySelector('.experience__subtitle').innerText;

    doc.setFontSize(12);
    doc.text(`${year} - ${title}`, margin, yOffset);
    yOffset += 10;
    doc.text(doc.splitTextToSize(subtitle, textWidth), margin, yOffset);
    yOffset += 10;

    const experienceItems = container.querySelectorAll('.experience__item');
    experienceItems.forEach(item => {
      doc.text(doc.splitTextToSize("- " + item.innerText, textWidth), margin + 5, yOffset);
      yOffset += 10;
    });
    yOffset += 10;
  });

  doc.save("resume.pdf");
});

document.querySelectorAll('.ripple').forEach(button => {
  button.addEventListener('click', function (e) {
    let rippleEffect = document.createElement('span');
    rippleEffect.classList.add('ripple-effect');
    rippleEffect.style.left = `${e.clientX - this.getBoundingClientRect().left}px`;
    rippleEffect.style.top = `${e.clientY - this.getBoundingClientRect().top}px`;
    this.appendChild(rippleEffect);

    setTimeout(() => {
      rippleEffect.remove();
    }, 600);
  });
});

function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png");
}