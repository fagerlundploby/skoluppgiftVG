document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('persona-form');
    const inputSection = document.getElementById('input-section');
    const outputSection = document.getElementById('output-section');
    const resetButton = document.getElementById('reset-button');
    const avatarPlaceholder = "https://via.placeholder.com/150x150?text=JA";

    // --- Randomize button ---
    const randomizeButton = document.getElementById('randomize-button');

    // --- Randomizer data (edit/add more if you want) ---
    const randomData = {
        names: [
            "Elin Andersson",
            "Noah Svensson",
            "Maja Karlsson",
            "William Johansson",
            "Alva Nilsson",
            "Lucas Lindberg",
            "Sofia Berg",
            "Hugo Eriksson"
        ],
        occupations: [
            "Marketing Director",
            "Ecommerce Manager",
            "Product Owner",
            "UX Designer",
            "Project Manager",
            "Sales Manager",
            "Content Strategist",
            "Brand Manager"
        ],
        brands: [
            ["IKEA", "Spotify", "H&M"],
            ["Volvo", "Telia", "ICA"],
            ["Nike", "Apple", "Adobe"],
            ["Samsung", "Bose", "Microsoft"],
            ["Netflix", "YouTube", "Canva"],
            ["Lidl", "Klarna", "Hemnet"]
        ],
        bios: [
            "I want a simple way to plan campaigns without wasting time on reporting.",
            "I need quick insights so I can make decisions faster.",
            "Our team needs a cleaner workflow and fewer manual steps.",
            "I want consistent results and a clear overview of what works.",
            "I want to reduce costs while keeping performance high."
        ],
        goals: [
            ["Increase website traffic", "Improve team efficiency", "Reduce campaign costs"],
            ["Improve conversion rate", "Grow email list", "Increase brand awareness"],
            ["Launch campaigns faster", "Better ROI tracking", "More consistent reporting"],
            ["Increase customer retention", "Improve user experience", "Grow organic traffic"]
        ],
        frustrations: [
            ["Time-consuming data entry", "Slow approval processes", "Inconsistent reporting"],
            ["Too many tools", "Unclear responsibilities", "Hard to measure results"],
            ["Messy spreadsheets", "Duplicate work", "Poor collaboration"],
            ["Unclear KPIs", "Too many meetings", "Last-minute changes"]
        ]
    };

    function pickOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setValue(id, value) {
        const el = document.getElementById(id);
        if (el) el.value = value;
    }

    function randomizeForm() {
        const name = pickOne(randomData.names);
        const occupation = pickOne(randomData.occupations);
        const age = randomInt(18, 60);

        const brands = pickOne(randomData.brands).join(", ");
        const bio = pickOne(randomData.bios);

        const goals = pickOne(randomData.goals).join(", ");
        const frustrations = pickOne(randomData.frustrations).join(", ");

        setValue("name", name);
        setValue("occupation", occupation);
        setValue("age", age);
        setValue("brands", brands);
        setValue("bio", bio);
        setValue("goals", goals);
        setValue("frustrations", frustrations);

        // Scores (1-100)
        setValue("analytical", randomInt(1, 100));
        setValue("creative", randomInt(1, 100));
        setValue("convenience", randomInt(1, 100));
        setValue("price", randomInt(1, 100));
        setValue("crm", randomInt(1, 100));
        setValue("social", randomInt(1, 100));
    }

    // Hook up randomize button click
    if (randomizeButton) {
        randomizeButton.addEventListener('click', randomizeForm);
    }

    /**
     * Helper function to generate list items from a comma-separated string.
     */
    function createListItems(text, ulElement, className = '') {
        ulElement.innerHTML = '';
        const items = text.split(',').map(item => item.trim()).filter(item => item.length > 0);

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            if (className) li.classList.add(className);
            ulElement.appendChild(li);
        });
    }

    /**
     * Generates the HTML for a single bar chart item.
     */
    function createChartHTML(label, score) {
        const width = Math.min(100, Math.max(0, parseInt(score)));

        return `
            <div class="chart-item">
                <span class="chart-label">${label}</span>
                <div class="chart-bar-container">
                    <div class="chart-bar" style="width: ${width}%;"></div>
                </div>
            </div>
        `;
    }

    /**
     * Handles the form submission to generate the full persona card.
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Get all basic text inputs
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const occupation = document.getElementById('occupation').value.trim();
        const bio = document.getElementById('bio').value.trim();
        const goals = document.getElementById('goals').value.trim();
        const frustrations = document.getElementById('frustrations').value.trim();
        const brands = document.getElementById('brands').value.trim();

        // 2. Get all score inputs
        const scores = {
            personality: [
                { label: 'Analytical', score: document.getElementById('analytical').value },
                { label: 'Creative', score: document.getElementById('creative').value }
            ],
            motivations: [
                { label: 'Convenience', score: document.getElementById('convenience').value },
                { label: 'Price', score: document.getElementById('price').value }
            ],
            channels: [
                { label: 'CRM Software', score: document.getElementById('crm').value },
                { label: 'Social Media', score: document.getElementById('social').value }
            ]
        };

        // 3. Populate basic details
        document.getElementById('persona-name').textContent = name;
        document.getElementById('persona-age').textContent = age;
        document.getElementById('persona-occupation').textContent = occupation;
        document.getElementById('persona-bio').textContent = bio;
        document.getElementById('persona-avatar').src = avatarPlaceholder;

        // 4. Create lists for Goals, Frustrations, and Brands
        createListItems(goals, document.getElementById('persona-goals-list'));
        createListItems(frustrations, document.getElementById('persona-frustrations-list'));
        createListItems(brands, document.getElementById('persona-brands-list'), 'tag-item');

        // 5. Generate and inject Bar Charts

        // Personality Charts
        const personalityHTML = scores.personality.map(item =>
            createChartHTML(item.label, item.score)
        ).join('');
        document.getElementById('persona-personality-charts').innerHTML = personalityHTML;

        // Motivations Charts
        const motivationsHTML = scores.motivations.map(item =>
            createChartHTML(item.label, item.score)
        ).join('');
        document.getElementById('persona-motivations-charts').innerHTML = motivationsHTML;

        // Channels Charts
        const channelsHTML = scores.channels.map(item =>
            createChartHTML(item.label, item.score)
        ).join('');
        document.getElementById('persona-channels-charts').innerHTML = channelsHTML;

        // 6. Toggle sections
        inputSection.classList.add('hidden');
        outputSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    /**
     * Resets the application to the input state.
     */
    resetButton.addEventListener('click', () => {
        form.reset();
        outputSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    });
});
