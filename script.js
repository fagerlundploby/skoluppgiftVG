document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('persona-form');
    const inputSection = document.getElementById('input-section');
    const outputSection = document.getElementById('output-section');
    const resetButton = document.getElementById('reset-button');
    const avatarPlaceholder = "https://via.placeholder.com/150x150?text=JA";

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