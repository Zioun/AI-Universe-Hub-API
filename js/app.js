const apiGet = async (seeMore) =>{
    const apiUrl = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(apiUrl)
    const getData = await res.json()
    const data = getData.data.tools;
    card(data, seeMore);
}

const card = (data, seeMore) =>{
    const cardArea = document.getElementById("card-area");
    const showBtn = document.getElementById("see-more-btn");
    if(data.length > 6 && seeMore){
        showBtn.classList.remove("hidden")
    }else{
        showBtn.classList.add("hidden");
    }
    // slice
    if(!seeMore){
        data = data.slice(0, 12);
    }
    
    data.forEach( (tool) => {
        const div = document.createElement("div");
        div.classList.add("card", "w-96", "bg-base-100", "shadow-xl", "border", "m-auto");
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl border m-auto">
        <figure class="px-4 pt-4">
            <img class="h-[200px]" src="${tool.image}" onerror="if (this.src != 'image/default-ui-image.webp') this.src = 'image/default-ui-image.webp';" alt="add alternative text here">
        </figure>
        <div class="card-body items-left text-left py-4 px-4">
            <h1 class="text-[20px] font-semibold">Features</h1>
            <div>
                <ul class="list-decimal ml-3 text-[#585858] text-[16px]">
                ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <hr>
            
            <div class="flex justify-between items-center">
                
                <div class="flex gap-3 flex-col">
                    <h2 class="text-[20px] font-semibold">${tool.name}</h2>
                    <div class="flex gap-3 text-[#585858] text-[16px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <span>${tool.published_in}</span>
                    </div>
                </div>
                <div>
                    <button onclick="showDetails('${tool.id}')" class="bg-[#FEF7F7] text-[#EB5757] p-3 rounded-[50%]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    cardArea.appendChild(div);
    });
}

// show details function
const showDetailsData = async (id) =>{
    const apiUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(apiUrl)
    const details = await res.json()
    const data = details.data;
    console.log(data)
    const detailsBox = document.getElementById("details-box");
    detailsBox.classList.add("modal-box", "bg-[#FEF7F7]");
    detailsBox.innerHTML = `
    <form method="dialog">
        <button class="btn btn-sm btn-circle bg-[#EB5757] text-white absolute right-2 top-2 block">✕</button>
    </form>
    <div class="grid grid-cols-12 gap-10 m-5">
        <div class="col-span-8 border rounded-2xl p-[30px]">
            <h1 class="text-[20px] font-semibold">${data.description}</h1>
            <div class="flex justify-between gap-5 py-7">
                <div class="bg-[#FFFFFF] text-[#03A30A] tex-[16px] font-bold p-[15px] rounded-2xl text-center"><span>${data.pricing[0].plan}</span> <span> ${data.pricing[0].price}</span></div>
                <div class="bg-[#FFFFFF] text-[#F28927] tex-[16px] font-bold p-[15px] rounded-2xl text-center">${data.pricing[1].plan}</span> <span> ${data.pricing[1].price}</div>
                <div class="bg-[#FFFFFF] text-[#EB5757] tex-[16px] font-bold p-[15px] rounded-2xl text-center">${data.pricing[2].plan}</span> <span> ${data.pricing[2].price}</div>
            </div>
            <div class="flex justify-between">
                <div>
                    <h1 class="text-[20px] font-semibold pb-5">Features</h1>
                    <ul class="flex flex-col gap-3 list-disc ml-5 text-[#585858]">
                    ${Object.values(data.features).map(feature => `<li>${feature.feature_name}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h1 class="text-[20px] font-semibold pb-5">Integrations</h1>
                    <ul class="flex flex-col gap-3 list-disc ml-5 text-[#585858]">
                    ${data.integrations.map(integration => `<li>${integration}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-span-4 border p-[30px] rounded-2xl">
            <div class="flex justify-center">
                <img class="h-[150px]" src="${data.image_link[0]}" onerror="if (this.src != 'image/default-ui-image.webp') this.src = 'image/default-ui-image.webp';" alt="add alternative text here">
            </div>
            <div class="text-center">
                <h1 class="text-[20px] font-semibold mt-5">${data.input_output_examples[0].input}</h1>
                <p class="text-[#585858] mt-5">${data.input_output_examples[0].output}</p>
            </div>
        </div>
    </div>
    `;
}

// show details button
const showDetails =  (id) => {
    showModal.showModal();
    showDetailsData(id);
};

// see more
const seeMore = () =>{
    apiGet(true);
}
seeMore()







