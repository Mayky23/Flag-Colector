document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    const exactMatchCheckbox = document.getElementById('exact-match');
    const sortSelect = document.querySelector('.sort-select');
    const machinesGrid = document.querySelector('.machines-grid');
    const machinesCount = document.querySelector('.machines-count');
    
    const allMachines = Array.from(document.querySelectorAll('.machine-card'));
    
    // Mapeo de dificultad
    const difficultyMap = {
        'fácil': 'easy',
        'medio': 'medium',
        'difícil': 'hard',
        'insano': 'insane'
    };

    function init() {
        updateCount(allMachines.length);
        setupEventListeners();
        filterMachines();
    }

    function setupEventListeners() {
        searchInput.addEventListener('input', filterMachines);
        filterSelects.forEach(select => select.addEventListener('change', filterMachines));
        exactMatchCheckbox.addEventListener('change', filterMachines);
        sortSelect.addEventListener('change', () => sortMachines());
    }

    function filterMachines() {
        const filters = {
            platform: document.querySelectorAll('.filter-select')[0].value,
            difficulty: document.querySelectorAll('.filter-select')[1].value,
            os: document.querySelectorAll('.filter-select')[2].value,
            searchTerm: searchInput.value.toLowerCase(),
            exactMatch: exactMatchCheckbox.checked
        };

        const filtered = allMachines.filter(machine => {
            return matchPlatform(machine, filters.platform) &&
                    matchDifficulty(machine, filters.difficulty) &&
                    matchOS(machine, filters.os) &&
                    matchSearch(machine, filters.searchTerm, filters.exactMatch);
        });

        sortMachines(filtered);
        updateCount(filtered.length);
    }

    function matchPlatform(machine, filter) {
        if (!filter) return true;
        return machine.dataset.platform === filter;
    }

    function matchDifficulty(machine, filter) {
        if (!filter) return true;
        return machine.dataset.difficulty === filter;
    }

    function matchOS(machine, filter) {
        if (!filter) return true;
        return machine.dataset.os === filter;
    }

    function matchSearch(machine, term, exact) {
        if (!term) return true;
        
        const content = [
            machine.querySelector('h3').textContent,
            machine.querySelector('.ip-address').textContent,
            ...Array.from(machine.querySelectorAll('.machine-techniques li')).map(li => li.textContent)
        ].join(' ').toLowerCase();

        return exact ? content.includes(term) : 
                    term.split(' ').every(word => content.includes(word));
    }

    function sortMachines(machines = allMachines) {
        const sorted = [...machines].sort((a, b) => {
            switch(sortSelect.value) {
                case 'name':
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                
                case 'difficulty':
                    const order = {easy: 1, medium: 2, hard: 3, insane: 4};
                    return order[a.dataset.difficulty] - order[b.dataset.difficulty];
                
                case 'platform':
                    return a.dataset.platform.localeCompare(b.dataset.platform);
                
                default: return 0;
            }
        });

        machinesGrid.innerHTML = '';
        sorted.forEach(m => machinesGrid.appendChild(m));
    }

    function updateCount(count) {
        machinesCount.innerHTML = `<i class="fas fa-server"></i> ${count} máquina${count !== 1 ? 's' : ''} disponible${count !== 1 ? 's' : ''}`;
    }

    init();
});