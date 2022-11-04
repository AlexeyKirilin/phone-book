const searchInput = document.querySelector(".top__input");
const bookContainer = document.querySelector(".book__content");


const listenForFavourite = () => {
	const favoriteButtons = bookContainer.querySelectorAll(".button-love");
	favoriteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = (e) => {
			const avatar = btn.getAttribute("src");
			if (avatar.includes("empty-heart")) {
				btn.setAttribute("src", "img/heart.png");
				sortBookItems(document.querySelectorAll(".book__item"));
			}

			if (avatar == "img/heart.png") {
				btn.setAttribute("src", "img/empty-heart.png");
				sortBookItems(document.querySelectorAll(".book__item"));
			}
		}
	})
}


const listenRemoveButtons = () => {
	const deleteButtons = bookContainer.querySelectorAll(".book__item-delete");
	deleteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = (e) => {
			const deleteItem = btn.closest(".book__item");
			deleteItem.onclick = null;
			deleteItem.remove();
			listenRemoveButtons();
			sortBookItems(document.querySelectorAll(".book__item"));
		}
	})
};

listenForFavourite();
listenRemoveButtons();



const sortBookItems = items => {
	const hiddenItems = [...items].filter(item => window.getComputedStyle(item).display === "none");

	const visibleItems = [...items].filter(item => window.getComputedStyle(item).display === "flex");

	const favoriteItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "img/heart.png";
	})

	const commonItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "img/empty-heart.png";
	});

	const sortedItems = [
		...favoriteItems,
		...commonItems.sort((a, b) => {
			const first = a.querySelector(".book__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			const second = b.querySelector(".book__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			if (first.attr < second.attr)
				return -1;
			if (first.attr > second.attr)
				return 1;
			return 0;
		}),
		...hiddenItems
	];
	bookContainer.replaceChildren(...sortedItems);
}
sortBookItems(document.querySelectorAll(".book__item"));


searchInput.addEventListener("input", (e) => {
	const searchValue = e.target.value;
	const items = document.querySelectorAll(".book__item");
	items.forEach(item => {
		const name = item.querySelector(".book__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
		if (!name.toLowerCase().includes(searchValue.toLowerCase())) {
			item.style.display = "none";
		}
		else {
			item.style.display = "flex";
		}
	});
	sortBookItems(items);
})