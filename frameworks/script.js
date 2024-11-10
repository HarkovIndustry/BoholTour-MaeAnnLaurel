const size = { xs: 2, md: 3, lg: 4, xl: 6 };

function createCard(card, index) {
  const colClassXs = `col-${Math.floor(12 / size.xs)}`;
  const colClassMd = `col-md-${Math.floor(12 / size.md)}`;
  const colClassLg = `col-lg-${Math.floor(12 / size.lg)}`;
  const colClassXl = `col-xl-${Math.floor(12 / size.xl)}`;

  const cardElement = document.createElement("div");
  cardElement.classList.add(
    colClassXs,
    colClassMd,
    colClassLg,
    colClassXl,
    "mb-4"
  );
  cardElement.innerHTML = `
                <div class="card">
                    <div id="carousel${index}" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            ${card.images
                              .map(
                                (image, idx) => `
                                <div class="carousel-item ${
                                  idx === 0 ? "active" : ""
                                }">
                                    <img src="${
                                      card.path
                                    }${image}" class="d-block w-100" alt="...">
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${index}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">&lt;</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${index}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">&gt;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${card.place}</h5>
                        <p class="card-text">${card.description}</p>
                        <p class="card-text"><small class="text-muted">${
                          card.address
                        }</small></p>
                        <button type="button" class="btn btn-primary" data-index="${index}">${
    card.button
  }</button>
                    </div>
                </div>
            `;
  return cardElement;
}

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".cardcontainer");
  const row = document.createElement("div");
  row.classList.add("row");
  cardContainer.appendChild(row);

  cards.forEach((card, index) => {
    const cardElement = createCard(card, index);
    row.appendChild(cardElement);
  });

  document.querySelectorAll(".btn-primary").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      const card = cards[index];
      Swal.fire({
        title: card.place,
        html: `
                            <hr><p><strong>Address:</strong> ${card.address}</p><hr>
                            <p><strong>Entrance Fee:</strong> ${card.fee}</p><hr>
                            <p><strong>Contact:</strong> ${card.contact}</p><hr>
                        `,
        showCloseButton: true,
        confirmButtonText: "Close",
      });
    });
  });
});
