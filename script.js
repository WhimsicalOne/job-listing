class JobListing {
    constructor() {
        this.jobList = document.getElementById("job-list");
        this.filterContainer = document.getElementById("filter-container");
        this.tags = [];
    }
    loadData = async () => {
        const data = await fetch("./data.json");
        const dataResponse = data.json();
        return dataResponse;
    }
    createJobListing = (data) => {
        data.map(listing => {
            const { company, contract, featured, id, languages, level, location, logo, position, postedAt, role, tools } = listing;
            this.jobList.innerHTML += `
                <div class="job-profile-listing ${featured == true ? "featured-new" : ""}" data-id=${id}>
                <div class="job-profile-listing--column-1">
                    <div class="profile-image">
                        <img src=${logo} alt=${company}>
                    </div>
                    <div class="profile-details">
                        <p class="badge-container">${company} ${listing.new == true ? "<span class='badge new'>NEW!</span>" : ""} ${featured == true ? "<span class='badge featured'>FEATURED</span>" : ""}</p>
                        <h3 class="title">${position}</h3>
                        <p class="other-details">
                            <span>${postedAt}</span>•<span>${contract}</span>•<span>${location}</span>
                        </p>
                    </div>
                </div>
                <div class="job-profile-listing--column-2">
                    <div class="tags">
                        <span class="tag">${role}</span>
                        <span class="tag">${level}</span>
                        ${typeof tools === 'object' ? tools.map(tool => `<span class="tag">${tool}</span>`).join('') : ""}
                        ${typeof languages === 'object' ? languages.map(language => `<span class="tag">${language}</span>`).join('') : ""}
                    </div>
                </div>
            </div>
            `
        })
    }
    addTagToFilterBox(tag) {
        this.tags.push(tag.innerHTML);
        if(!this.tags.length) {
            console.log("No tags");
        } else {
            console.log("Added a tag");
        }
    }
    removeTag(e) {
        if(e.target.innerHTML && this.tags.length) {
            this.filterList.filter(tagName !== e.target.innerHTML);
        }
    }
    filterList = (topLevelData, tag) => {
        /* 
        1.  Get the tag based on user selection and filter according to that.
        2.  User selection recalls all data based on selection.
        3.  Load data and display it.
        4.  Clear all, or remove filter one by one.
        */
       topLevelData.map(data => {
            const values = Object.values(data);
            values.map(value => {
                if(value == tag.innerHTML) {
                    this.createJobListing(newList);
                }
            })
       })
    }  
}


window.addEventListener("load", () => {
    const jobListing = new JobListing();
    const data = jobListing.loadData();
    data.then(data => jobListing.createJobListing(data));
    jobListing.jobList.addEventListener("click", (e) => {
        e.preventDefault();
        data.then(data => jobListing.filterList(data, e.target))
        jobListing.addTagToFilterBox(e.target);
    })
})
// Reminders:
// Use ul on line 25.
// Figured out a way to rewrite current HTML with new HTML.
// Also add a loading feature; CSS.