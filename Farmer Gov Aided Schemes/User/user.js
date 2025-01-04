var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("userName"),
  eligibility = document.getElementById("eligibility"),
  exclusions = document.getElementById("exclusions"),
  documents = document.getElementById("documents"),
  benefits = document.getElementById("benefit"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newSchemeBtn = document.querySelector(".newScheme");

let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

let isEdit = false,
  editId;

showInfo();

newSchemeBtn.addEventListener("click", () => {
  submitBtn.innerText = "submit";
  modalTitle.innerText = "New Scheme Details";
  isEdit = false;
  imgInput.src = "/Images/profile.png";
  form.reset();
});

file.onchange = function () {
  if (file.files[0].size < 1000000) {
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };
    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("This file is too large!");
  }
};

function showInfo() {
  document.querySelectorAll(".schemeDetails").forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class="schemeDetails">
      <td>${index + 1}</td>
      <td><img src="${element.picture}" alt="" height="50" width="50" ></td>
      <td>${element.schemeName}</td>
      <td>${element.schemeEligibility}</td>
      <td>${element.schemeExclusions}</td>
      <td>${element.schemeDocuments}</td>
      <td>${element.schemeBenefits}</td>
      <td>
        <button class="btn btn-success" onclick="readInfo(\`${
          element.picture
        }\`,
          \`${element.schemeName}\`,
          \`${element.schemeEligibility}\`,
          \`${element.schemeExclusions}\`,
          \`${element.schemeDocuments}\`,
          \`${element.schemeBenefits}\`)"
          data-bs-toggle="modal" data-bs-target="#readData">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>    
    </tr>`;

    userInfo.innerHTML += createElement;
  });
}

function addBulletsToText(text) {
  return text
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : `• ${line.trim()}`))
    .join("\n");
}

function readInfo(pic, name, eligibility, exclusions, documents, benefits) {
  document.querySelector(".showImg").src = pic;

  const showName = document.querySelector("#showName");
  const showEligibility = document.querySelector("#showEligibility");
  const showDocuments = document.querySelector("#showDocuments");
  const showExclusions = document.querySelector("#showExclusions");
  const showBenefits = document.querySelector("#showBenefits");

  showName.value = name;
  showEligibility.value = addBulletsToText(eligibility);
  showDocuments.value = addBulletsToText(documents);
  showExclusions.value = addBulletsToText(exclusions);
  showBenefits.value = addBulletsToText(benefits);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    picture: imgInput.src == undefined ? "/Images/profile.png" : imgInput.src,
    schemeName: userName.value,
    schemeEligibility: eligibility.value,
    schemeExclusions: exclusions.value,
    schemeBenefits: benefits.value,
    schemeDocuments: documents.value
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
    getData[editId] = information;
  }

  localStorage.setItem("userProfile", JSON.stringify(getData));
  submitBtn.innerText = "Submit";
  modalTitle.innerHTML = "New Scheme Details";

  showInfo();

  form.reset();

  imgInput.src = "/Images/profile.png";
  modal.style.display = "none";
  document.querySelector(".modal-backdrop").remove();
});

function autoExpandTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

document.querySelectorAll(".autoExpand").forEach((textarea) => {
  textarea.addEventListener("input", function () {
    autoExpandTextarea(this);
  });
});
