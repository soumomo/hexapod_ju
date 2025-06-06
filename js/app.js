// DOM Elements
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const floatingSidebarToggle = document.querySelector('#floatingSidebarToggle');
const mainContent = document.querySelector('.main-content');
const navLinks = document.querySelectorAll('.sidebar__nav a');

// Generate random avatar from Iran API
function generateRandomAvatar() {
    const randomId = Math.floor(Math.random() * 100) + 1;
    return `https://avatar.iran.liara.run/public/boy?username=${randomId}`;
}

// Initialize team members with random avatars if not in localStorage
function initializeTeamMembers() {
    const defaultMembers = {
        software: [
            { id: 1, name: "Soumodeep", title: "Team Lead", image: generateRandomAvatar(), team: "software" },
            { id: 2, name: "Arka", title: "Backend Developer", image: generateRandomAvatar(), team: "software" },
            { id: 3, name: "Rajanya", title: "Frontend Developer", image: generateRandomAvatar(), team: "software" }
        ],
        electronics: [
            { id: 1, name: "Pratyush", title: "Team Lead", image: generateRandomAvatar(), team: "electronics" },
            { id: 2, name: "Krishnendu", title: "PCB Designer", image: generateRandomAvatar(), team: "electronics" },
            { id: 3, name: "Kalpak", title: "Sensor Integration", image: generateRandomAvatar(), team: "electronics" },
            { id: 4, name: "Remon", title: "Testing & Validation", image: generateRandomAvatar(), team: "electronics" },
            { id: 5, name: "Sagnik De", title: "Component Specialist", image: generateRandomAvatar(), team: "electronics" }
        ],
        hardware: [
            { id: 1, name: "Ayushman", title: "Team Lead", image: generateRandomAvatar(), team: "hardware" },
            { id: 2, name: "Sagnik Sen", title: "Manufacturing Specialist", image: generateRandomAvatar(), team: "hardware" }
        ]
    };

    return {
        software: JSON.parse(localStorage.getItem('softwareMembers')) || defaultMembers.software,
        electronics: JSON.parse(localStorage.getItem('electronicsMembers')) || defaultMembers.electronics,
        hardware: JSON.parse(localStorage.getItem('hardwareMembers')) || defaultMembers.hardware
    };
}

// Data Storage
let teamMembers = initializeTeamMembers();

// Original Timeline Data - Restored as requested
let projectTimeline = JSON.parse(localStorage.getItem('projectTimeline')) || [
    {
        id: 1,
        title: "Phase 1: Research & Planning",
        description: "Initial research, team formation, and project planning phase",
        status: "completed",
        date: "2024-11-30",
        tasks: ["Literature review", "Team formation", "Project scope definition", "Resource identification"]
    },
    {
        id: 2,
        title: "Phase 2: Design & Development",
        description: "Hardware design, software development, and system integration",
        status: "in-progress", 
        date: "2024-12-31",
        tasks: ["Mechanical design", "Circuit design", "Software development", "System integration"]
    },
    {
        id: 3,
        title: "Phase 3: Testing & Optimization",
        description: "Prototype testing, debugging, and performance optimization",
        status: "pending",
        date: "2025-01-31",
        tasks: ["Prototype assembly", "Functional testing", "Performance optimization", "Final documentation"]
    }
];

// Processor data for comparison
const processorData = {
    'rpi5': {
        name: 'Raspberry Pi 5',
        cpu: 'Quad-core ARM Cortex-A76 @ 2.4GHz',
        gpu: 'VideoCore VII GPU',
        memory: '4GB/8GB LPDDR4X-4267',
        realTimeCtrl: 'STM32 required (20µs precision)',
        aiCapability: 'CPU-driven (8-12 FPS YOLOv8)',
        powerEfficiency: '8-12W',
        devComplexity: 'Beginner-friendly',
        communitySupport: 'Excellent (massive community)',
        gpio: '40-pin GPIO header',
        connectivity: 'USB 3.0, Gigabit Ethernet, WiFi 6, Bluetooth 5.0',
        costINR: '₹7.5k + ₹2k STM32'
    },
    'jetson-nano': {
        name: 'NVIDIA Jetson Nano',
        cpu: 'Quad-core ARM Cortex-A57 @ 1.43GHz',
        gpu: '128-core Maxwell GPU',
        memory: '4GB LPDDR4',
        realTimeCtrl: 'STM32 required (50µs precision)',
        aiCapability: 'GPU-accelerated (15-20 FPS YOLOv8)',
        powerEfficiency: '10-15W',
        devComplexity: 'Intermediate',
        communitySupport: 'Good (NVIDIA ecosystem)',
        gpio: '40-pin GPIO header',
        connectivity: 'USB 3.0, Gigabit Ethernet, WiFi/BT via module',
        costINR: '₹13.5k + ₹2k STM32'
    },
    'vaaman': {
        name: 'Vicharak Vaaman',
        soc: 'Rockchip RK3399 (Dual A72 + Quad A53)',
        cpu: 'Dual-core A72 @ 1.8GHz + Quad A53 @ 1.4GHz',
        gpu: 'Mali-T864 MP4',
        fpga: 'Efinix Trion T120 (112,128 LEs)',
        memory: '4GB LPDDR4',
        realTimeCtrl: 'FPGA (0.5µs PWM precision)',
        aiCapability: 'CPU-bound (4 FPS YOLOv5n)',
        powerEfficiency: '5-8W',
        devComplexity: 'Advanced (FPGA expertise needed)',
        communitySupport: 'Limited (niche)',
        gpio: '40-pin + FPGA I/O',
        connectivity: 'USB 3.0, Gigabit Ethernet, WiFi, Bluetooth',
        costINR: '₹12k-15k'
    }
};

// Navigation
function handleNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only prevent default for hash-based navigation (internal sections)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // Show target page
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.add('hidden');
                });
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.classList.remove('hidden');
                }
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            } else if (href.includes('index.html#timeline')) {
                // Fix: If timeline link is clicked from another page, go to index.html and scroll to timeline
                // Allow default navigation, but add a hashchange handler to scroll to timeline
                window.location.href = href;
            }
        });
    });
}

// Expandable Content Handler
function handleExpandableContent() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = header.querySelector('.expand-icon');
            
            // Toggle expanded state
            header.classList.toggle('expanded');
            content.classList.toggle('expanded');
        });
    });
}

// Resource Filtering
function handleResourceFiltering() {
    const resourceFilters = document.querySelectorAll('.resource-filter');
    const resourceCategories = document.querySelectorAll('.resource-category');
    
    resourceFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterValue = filter.getAttribute('data-filter');
            
            // Update active state
            resourceFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter resource categories
            resourceCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (filterValue === 'all' || categoryType === filterValue) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Sidebar Toggle
function handleSidebarToggle() {
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                sidebar.classList.toggle('active');
            } else {
                const isCollapsed = sidebar.classList.contains('collapsed');
                
                if (isCollapsed) {
                    sidebar.classList.remove('collapsed');
                    mainContent.classList.remove('expanded');
                    if (floatingSidebarToggle) {
                        floatingSidebarToggle.style.display = 'none';
                    }
                } else {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('expanded');
                    setTimeout(() => {
                        if (floatingSidebarToggle && sidebar.classList.contains('collapsed')) {
                            floatingSidebarToggle.style.display = 'flex';
                        }
                    }, 300);
                }
            }
        });
    }
}

// Floating Sidebar Toggle
function handleFloatingSidebarToggle() {
    if (floatingSidebarToggle) {
        floatingSidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            floatingSidebarToggle.style.display = 'none';
        });
    }
}

// Window Resize Handler
function handleWindowResize() {
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('active');
            mainContent.classList.remove('expanded');
            if (floatingSidebarToggle) {
                floatingSidebarToggle.style.display = 'none';
            }
        } else {
            sidebar.classList.remove('active');
            if (!sidebar.classList.contains('collapsed')) {
                mainContent.classList.remove('expanded');
                if (floatingSidebarToggle) {
                    floatingSidebarToggle.style.display = 'none';
                }
            }
        }
    });
}

// Function to update team member counts on the main page
function updateTeamCounts() {
    const softwareTeamCount = document.getElementById('softwareTeamCount');
    const electronicsTeamCount = document.getElementById('electronicsTeamCount');
    const hardwareTeamCount = document.getElementById('hardwareTeamCount');

    if (softwareTeamCount) {
        softwareTeamCount.textContent = teamMembers.software.length;
    }
    if (electronicsTeamCount) {
        electronicsTeamCount.textContent = teamMembers.electronics.length;
    }
    if (hardwareTeamCount) {
        hardwareTeamCount.textContent = teamMembers.hardware.length;
    }
}

// Initialize processor comparison
function initializeProcessorComparison() {
    const checkboxes = document.querySelectorAll('.processor-compare-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateComparison);
    });
}

// Update comparison based on selected processors
function updateComparison() {
    const checkboxes = document.querySelectorAll('.processor-compare-checkbox:checked');
    const selectedProcessorNamesFromCheckboxes = Array.from(checkboxes).map(cb => cb.dataset.processorName);

    const selectedProcessors = selectedProcessorNamesFromCheckboxes.map(nameAttribute => {
        if (typeof nameAttribute !== 'string') {
            console.warn('Processor name attribute is not a string or is missing.');
            return 'invalidkey-' + Math.random().toString(36).substring(2, 10); // Unique non-matching key
        }

        const name = nameAttribute.trim(); // Trim whitespace

        if (name === 'Raspberry Pi 5') return 'rpi5';
        if (name === 'Jetson Nano') return 'jetson-nano';
        // Robust check for Vicharak Vaaman: case-insensitive
        if (name.toLowerCase() === 'vicharak vaaman') return 'vaaman';

        // Fallback for any other names
        console.warn(`Unknown or unhandled processor name from checkbox: "${nameAttribute}". Mapping to: "${name.toLowerCase().replace(/\\s+/g, '-')}"`);
        return name.toLowerCase().replace(/\\s+/g, '-');
    });

    const comparisonSection = document.getElementById('processorComparisonSection');
    const tableContainer = document.getElementById('comparisonTableContainer');
    const summaryContainer = document.getElementById('aiComparisonSummary');

    // Filter out processor keys that don't exist in processorData
    const validProcessors = selectedProcessors.filter(procKey => {
        const isValid = processorData.hasOwnProperty(procKey);
        if (!isValid) {
            // Find the original nameAttribute that led to this procKey for better warning
            const originalName = selectedProcessorNamesFromCheckboxes.find((n, index) => selectedProcessors[index] === procKey);
            console.warn(`Derived processor key "${procKey}" (from checkbox value "${originalName || 'unknown'}") not found in processorData.`);
        }
        return isValid;
    });

    if (validProcessors.length >= 2) {
        if (comparisonSection) comparisonSection.style.display = 'block';
        // Ensure containers exist before trying to call functions that modify them or their content
        if (tableContainer) renderComparisonTable(validProcessors);
        if (summaryContainer) generateComparisonSummary(validProcessors);
    } else {
        if (comparisonSection) comparisonSection.style.display = 'none';
        
        let message = '<p>Select at least 2 recognized processors to compare.</p>';
        if (checkboxes.length > 0) { // Only refine message if some checkboxes are checked
            if (validProcessors.length === 1) {
                message = '<p>One processor selected. Please select at least one more recognized processor to compare.</p>';
            } else if (validProcessors.length === 0 && checkboxes.length > 0) { // 0 valid, but some were checked
                message = '<p>The selected processor(s) are not recognized. Please check the selection or the console for details.</p>';
            }
        }
        // If checkboxes.length === 0, the default message is fine.

        if (tableContainer) tableContainer.innerHTML = message;
        if (summaryContainer) summaryContainer.innerHTML = '';
    }
}

// Render comparison table
function renderComparisonTable(selectedProcessors) {
    const tableContainer = document.getElementById('comparisonTableContainer');
    
    if (selectedProcessors.length < 2) {
        tableContainer.innerHTML = '<p>Select at least 2 processors to compare.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'comparison-table';
    
    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Specification</th>' + 
        selectedProcessors.map(procKey => `<th>${processorData[procKey].name}</th>`).join('');
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Body
    const tbody = document.createElement('tbody');
    const specs = [
        { key: 'cpu', label: 'CPU/SoC' },
        { key: 'gpu', label: 'GPU' },
        { key: 'fpga', label: 'FPGA' },
        { key: 'memory', label: 'Memory' },
        { key: 'realTimeCtrl', label: 'Real-Time Control' },
        { key: 'aiCapability', label: 'AI Capability' },
        { key: 'powerEfficiency', label: 'Power Efficiency' },
        { key: 'devComplexity', label: 'Dev Complexity' },
        { key: 'communitySupport', label: 'Community Support' },
        { key: 'gpio', label: 'GPIO' },
        { key: 'connectivity', label: 'Connectivity' },
        { key: 'costINR', label: 'Cost (INR)' }
    ];
    
    specs.forEach(spec => {
        const row = document.createElement('tr');
        let rowHTML = `<td><strong>${spec.label}</strong></td>`;
        selectedProcessors.forEach(procKey => {
            let value = '';
            if (spec.key === 'cpu' && procKey === 'vaaman') {
                value = processorData[procKey]['soc'] || '-';
            } else {
                value = processorData[procKey][spec.key] || '-';
            }
            rowHTML += `<td>${value}</td>`;
        });
        row.innerHTML = rowHTML;
        tbody.appendChild(row);
    });
        
    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Generate comparison summary
function generateComparisonSummary(selectedProcessors) {
    const summaryContainer = document.getElementById('aiComparisonSummary');
    
    if (selectedProcessors.length < 2) return;
    
    const processorNames = selectedProcessors.map(proc => processorData[proc].name).join(' vs ');
    
    let analysis = `<p><strong>For RoboFest Gujarat 2025 Hexapod Development:</strong></p>`;
    
    // Two-processor comparisons
    if (selectedProcessors.includes('rpi5') && selectedProcessors.includes('jetson-nano') && selectedProcessors.length === 2) {
        analysis += `
            <p><strong>Raspberry Pi 5 vs Jetson Nano:</strong></p>
            <ul>
                <li><strong>Processing Power:</strong> Jetson Nano leads in AI tasks with GPU acceleration, while Pi 5 excels in general-purpose computing</li>
                <li><strong>Real-time Control:</strong> Both require STM32 co-processor for precise servo control (Pi 5: 20µs, Jetson: 50µs)</li>
                <li><strong>Cost Efficiency:</strong> Pi 5 is more budget-friendly (₹9.5k total vs ₹15.5k), better for student teams</li>
                <li><strong>Development Ease:</strong> Pi 5 has superior community support and simpler setup</li>
            </ul>
            <p><em>Recommendation:</em> Choose Pi 5 for cost-effective development or Jetson Nano for advanced AI features.</p>
        `;
    } else if (selectedProcessors.includes('rpi5') && selectedProcessors.includes('vaaman') && selectedProcessors.length === 2) {
        analysis += `
            <p><strong>Raspberry Pi 5 vs Vicharak Vaaman:</strong></p>
            <ul>
                <li><strong>Real-time Control:</strong> Vaaman's FPGA provides superior precision (0.5µs) vs Pi 5's STM32 requirement (20µs)</li>
                <li><strong>Power Efficiency:</strong> Vaaman is more efficient (5-8W) compared to Pi 5 (8-12W), better for battery-powered robots</li>
                <li><strong>Development Complexity:</strong> Pi 5 is beginner-friendly while Vaaman requires FPGA expertise (Verilog/VHDL)</li>
                <li><strong>Community Support:</strong> Pi 5 has massive community vs Vaaman's limited but specialized support</li>
                <li><strong>Cost:</strong> Similar pricing range (₹9.5k vs ₹12-15k) with different trade-offs</li>
            </ul>
            <p><em>Recommendation:</em> Choose Pi 5 for easier development or Vaaman for advanced real-time control requirements.</p>
        `;
    } else if (selectedProcessors.includes('jetson-nano') && selectedProcessors.includes('vaaman') && selectedProcessors.length === 2) {
        analysis += `
            <p><strong>Jetson Nano vs Vicharak Vaaman:</strong></p>
            <ul>
                <li><strong>AI Performance:</strong> Jetson's GPU acceleration (15-20 FPS YOLOv8) significantly outperforms Vaaman's CPU-bound AI (4 FPS YOLOv5n)</li>
                <li><strong>Real-time Control:</strong> Vaaman's FPGA (0.5µs precision) is far superior to Jetson's STM32 requirement (50µs)</li>
                <li><strong>Power Consumption:</strong> Vaaman is more efficient (5-8W) vs Jetson (10-15W)</li>
                <li><strong>Development Approach:</strong> Jetson focuses on AI/computer vision, Vaaman on precise hardware control</li>
                <li><strong>Cost:</strong> Similar range but Jetson includes STM32 costs (₹15.5k total vs ₹12-15k)</li>
            </ul>
            <p><em>Recommendation:</em> Choose Jetson for AI-heavy applications or Vaaman for precision control-focused hexapods.</p>
        `;
    }
    
    // Three-processor comparison
    else if (selectedProcessors.length === 3) {
        analysis += `
            <p><strong>Complete Processor Analysis:</strong></p>
            <ul>
                <li><strong>Real-time Control Ranking:</strong> Vaaman (0.5µs FPGA) > Pi 5 (20µs STM32) > Jetson (50µs STM32)</li>
                <li><strong>AI Performance Ranking:</strong> Jetson (15-20 FPS GPU) > Pi 5 (8-12 FPS CPU) > Vaaman (4 FPS CPU)</li>
                <li><strong>Power Efficiency Ranking:</strong> Vaaman (5-8W) > Pi 5 (8-12W) > Jetson (10-15W)</li>
                <li><strong>Development Ease Ranking:</strong> Pi 5 (beginner) > Jetson (intermediate) > Vaaman (advanced)</li>
                <li><strong>Cost-effectiveness:</strong> Pi 5 (₹9.5k) > Vaaman (₹12-15k) > Jetson (₹15.5k)</li>
            </ul>
            <p><strong>Hexapod-Specific Recommendations:</strong></p>
            <ul>
                <li><strong>Competition Stage 1:</strong> Pi 5 for rapid prototyping and basic locomotion</li>
                <li><strong>Competition Stage 2:</strong> Vaaman for advanced control or Jetson for AI features</li>
                <li><strong>Hybrid Approach:</strong> Pi 5 + Vaaman combination for best of both worlds</li>
            </ul>
        `;
    }
    
    summaryContainer.innerHTML = `
        <div class="ai-comparison-content">
            <h4><i class="fas fa-microchip"></i> Technical Analysis: ${processorNames}</h4>
            ${analysis}
        </div>
    `;
}

// Save team data to localStorage
function saveTeamData() {
    localStorage.setItem('softwareMembers', JSON.stringify(teamMembers.software));
    localStorage.setItem('electronicsMembers', JSON.stringify(teamMembers.electronics));
    localStorage.setItem('hardwareMembers', JSON.stringify(teamMembers.hardware));
}

// Save timeline data to localStorage
function saveTimelineData() {
    localStorage.setItem('projectTimeline', JSON.stringify(projectTimeline));
}

// Render team members dynamically
function renderTeamMembers() {
    const teams = ['software', 'electronics', 'hardware'];
    
    teams.forEach(teamType => {
        const container = document.getElementById(`${teamType}TeamMembers`);
        if (!container) return;
        
        container.innerHTML = '';
        
        teamMembers[teamType].forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member-card';
            memberElement.innerHTML = `
                <div class="team-member-avatar">
                    ${member.image && member.image.trim() ? 
                        `<img src="${member.image}" alt="${member.name}" onerror="this.src='${generateRandomAvatar()}'">` : 
                        `<img src="${generateRandomAvatar()}" alt="${member.name}" onerror="this.style.display='none'">`
                    }
                </div>
                <div class="team-member-info">
                    <h4>${member.name}</h4>
                    <p>${member.title}</p>
                </div>
                <div class="team-member-actions">
                    <button class="btn btn--sm btn--secondary" onclick="editTeamMember('${teamType}', ${member.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn--sm btn--danger" onclick="deleteTeamMember('${teamType}', ${member.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            container.appendChild(memberElement);
        });
        
        // Add "Add Member" button
        const addButton = document.createElement('div');
        addButton.className = 'team-member-card team-member-add';
        addButton.innerHTML = `
            <button class="btn btn--primary" onclick="addTeamMember('${teamType}')">
                <i class="fas fa-plus"></i> Add Member
            </button>
        `;
        container.appendChild(addButton);
    });
    
    updateTeamCounts();
}

// Add new team member
function addTeamMember(teamType) {
    showTeamMemberModal(teamType);
}

// Edit team member
function editTeamMember(teamType, memberId) {
    const member = teamMembers[teamType].find(m => m.id === memberId);
    if (member) {
        showTeamMemberModal(teamType, member);
    }
}

// Delete team member
function deleteTeamMember(teamType, memberId) {
    if (confirm('Are you sure you want to delete this team member?')) {
        teamMembers[teamType] = teamMembers[teamType].filter(m => m.id !== memberId);
        saveTeamData();
        renderTeamMembers();
        updateTeamCounts();
    }
}

// Show team member modal
function showTeamMemberModal(teamType, member = null) {
    const isEdit = member !== null;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${isEdit ? 'Edit' : 'Add'} Team Member</h3>
                <button class="btn btn--sm btn--secondary modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="teamMemberForm">
                    <div class="form-group">
                        <label for="memberName">Name:</label>
                        <input type="text" id="memberName" value="${member ? member.name : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="memberTitle">Title:</label>
                        <input type="text" id="memberTitle" value="${member ? member.title : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="memberImage">Image URL:</label>
                        <input type="url" id="memberImage" value="${member ? member.image : ''}" placeholder="Enter image URL (optional)">
                        <small>Leave empty to use default icon, or provide your own image URL</small>
                    </div>
                    <div class="form-group">
                        <label>Preview:</label>
                        <div class="member-preview">
                            <div class="team-member-avatar" style="width: 60px; height: 60px;">
                                ${member && member.image && member.image.trim() ? 
                                    `<img id="memberImagePreview" src="${member.image}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${generateRandomAvatar()}'">` : 
                                    `<img id="memberImagePreview" src="${generateRandomAvatar()}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">`
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn--secondary modal-close">Cancel</button>
                <button class="btn btn--primary" onclick="saveTeamMember('${teamType}', ${member ? member.id : 'null'})">
                    ${isEdit ? 'Update' : 'Add'} Member
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle image preview
    const imageInput = document.getElementById('memberImage');
    const imagePreview = document.querySelector('.member-preview .team-member-avatar');
    imageInput.addEventListener('input', () => {
        const imageUrl = imageInput.value.trim();
        if (imageUrl) {
            imagePreview.innerHTML = `<img src="${imageUrl}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${generateRandomAvatar()}'">`;
        } else {
            imagePreview.innerHTML = `<img src="${generateRandomAvatar()}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
    });
    
    // Handle modal close
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Save team member
function saveTeamMember(teamType, memberId) {
    const name = document.getElementById('memberName').value.trim();
    const title = document.getElementById('memberTitle').value.trim();
    const image = document.getElementById('memberImage').value.trim();
    
    if (!name || !title) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (memberId && memberId !== 'null') {
        // Edit existing member
        const memberIndex = teamMembers[teamType].findIndex(m => m.id === parseInt(memberId));
        if (memberIndex !== -1) {
            teamMembers[teamType][memberIndex] = {
                ...teamMembers[teamType][memberIndex],
                name,
                title,
                image: image || generateRandomAvatar() // Use random avatar if no image provided
            };
        }
    } else {
        // Add new member
        const newId = Math.max(...teamMembers[teamType].map(m => m.id), 0) + 1;
        teamMembers[teamType].push({
            id: newId,
            name,
            title,
            image: image || generateRandomAvatar(), // Use random avatar if no image provided
            team: teamType
        });
    }
    
    saveTeamData();
    renderTeamMembers();
    document.querySelector('.modal').remove();
}

// Render project timeline
function renderProjectTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    projectTimeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item status-${item.status}`;
        
        const statusIcons = {
            'completed': 'fa-check-circle',
            'in-progress': 'fa-clock',
            'pending': 'fa-circle'
        };
        
        const statusColors = {
            'completed': 'success',
            'in-progress': 'warning',
            'pending': 'info'
        };
        
        timelineItem.innerHTML = `
            <div class="timeline-marker">
                <i class="fas ${statusIcons[item.status]}"></i>
            </div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h4>${item.title}</h4>
                    <div class="timeline-actions">
                        <span class="status status--${statusColors[item.status]}">${item.status.replace('-', ' ').toUpperCase()}</span>
                        <button class="btn btn--sm btn--secondary" onclick="editTimelineItem(${item.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn--sm btn--danger" onclick="deleteTimelineItem(${item.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <p class="timeline-description">${item.description}</p>
                <p class="timeline-date"><i class="far fa-calendar"></i> ${new Date(item.date).toLocaleDateString()}</p>
                <div class="timeline-tasks">
                    <strong>Tasks:</strong>
                    <ul>
                        ${item.tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
    
    // Add "Add Timeline Item" button
    const addButton = document.createElement('div');
    addButton.className = 'timeline-item timeline-add';
    addButton.innerHTML = `
        <div class="timeline-marker">
            <i class="fas fa-plus"></i>
        </div>
        <div class="timeline-content">
            <button class="btn btn--primary" onclick="addTimelineItem()">
                <i class="fas fa-plus"></i> Add Timeline Item
            </button>
        </div>
    `;
    container.appendChild(addButton);
}

// Add timeline item
function addTimelineItem() {
    showTimelineModal();
}

// Edit timeline item
function editTimelineItem(itemId) {
    const item = projectTimeline.find(t => t.id === itemId);
    if (item) {
        showTimelineModal(item);
    }
}

// Delete timeline item
function deleteTimelineItem(itemId) {
    if (confirm('Are you sure you want to delete this timeline item?')) {
        projectTimeline = projectTimeline.filter(t => t.id !== itemId);
        saveTimelineData();
        renderProjectTimeline();
    }
}

// Show timeline modal
function showTimelineModal(item = null) {
    const isEdit = item !== null;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h3>${isEdit ? 'Edit' : 'Add'} Timeline Item</h3>
                <button class="btn btn--sm btn--secondary modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="timelineForm">
                    <div class="form-group">
                        <label for="timelineTitle">Title:</label>
                        <input type="text" id="timelineTitle" value="${item ? item.title : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="timelineDescription">Description:</label>
                        <textarea id="timelineDescription" rows="3" required>${item ? item.description : ''}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="timelineDate">Target Date:</label>
                            <input type="date" id="timelineDate" value="${item ? item.date : ''}" required>
                        </div>
                        <div class="form-group">
                            <label for="timelineStatus">Status:</label>
                            <select id="timelineStatus" required>
                                <option value="pending" ${item && item.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="in-progress" ${item && item.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                <option value="completed" ${item && item.status === 'completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="timelineTasks">Tasks (one per line):</label>
                        <textarea id="timelineTasks" rows="4" placeholder="Enter tasks, one per line">${item ? item.tasks.join('\n') : ''}</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn--secondary modal-close">Cancel</button>
                <button class="btn btn--primary" onclick="saveTimelineItem(${item ? item.id : 'null'})">
                    ${isEdit ? 'Update' : 'Add'} Item
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Save timeline item
function saveTimelineItem(itemId) {
    const title = document.getElementById('timelineTitle').value.trim();
    const description = document.getElementById('timelineDescription').value.trim();
    const date = document.getElementById('timelineDate').value;
    const status = document.getElementById('timelineStatus').value;
    const tasks = document.getElementById('timelineTasks').value
        .split('\n')
        .map(task => task.trim())
        .filter(task => task.length > 0);
    
    if (!title || !description || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (itemId && itemId !== 'null') {
        // Edit existing item
        const itemIndex = projectTimeline.findIndex(t => t.id === parseInt(itemId));
        if (itemIndex !== -1) {
            projectTimeline[itemIndex] = {
                ...projectTimeline[itemIndex],
                title,
                description,
                date,
                status,
                tasks
            };
        }
    } else {
        // Add new item
        const newId = Math.max(...projectTimeline.map(t => t.id), 0) + 1;
        projectTimeline.push({
            id: newId,
            title,
            description,
            date,
            status,
            tasks
        });
    }
    
    saveTimelineData();
    renderProjectTimeline();
    document.querySelector('.modal').remove();
}

// Initialize Components - CLEAN VERSION WITHOUT AUTO-POPUPS
function initializeComponents() {
    // Initialize UI components only
    handleNavigation();
    handleResourceFiltering();
    handleSidebarToggle();
    handleFloatingSidebarToggle();
    handleWindowResize();
    handleExpandableContent();
    initializeProcessorComparison();
    
    // Render dynamic content only if containers exist
    if (document.getElementById('timelineContainer')) {
        renderProjectTimeline();
    }
    
    const teamContainers = ['software', 'electronics', 'hardware'];
    teamContainers.forEach(team => {
        if (document.getElementById(`${team}TeamMembers`)) {
            renderTeamMembers();
        }
    });
    
    // Show home page by default
    const homeLink = document.querySelector('.sidebar__nav a[href="#home"]');
    if (homeLink) {
        homeLink.click();
    }
    
    // Update team counts
    updateTeamCounts();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeComponents);

// Make functions globally accessible for onclick handlers
window.addTeamMember = addTeamMember;
window.editTeamMember = editTeamMember;
window.deleteTeamMember = deleteTeamMember;
window.saveTeamMember = saveTeamMember;
window.addTimelineItem = addTimelineItem;
window.editTimelineItem = editTimelineItem;
window.deleteTimelineItem = deleteTimelineItem;
window.saveTimelineItem = saveTimelineItem;

// Dummy function for any legacy references
window.closeTimelineModal = function() {
    // This function is for legacy compatibility only
    // Dynamic modals handle their own closing
};

// Dummy function for any legacy references
window.closeMemberModal = function() {
    // This function is for legacy compatibility only
    // Dynamic modals handle their own closing
};

// Legacy alias for addTeamMember
window.showAddMemberModal = function(teamType) {
    addTeamMember(teamType);
};
