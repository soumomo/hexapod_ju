// Resource Management System for Hexapod Project
// Handles CRUD operations for resource tables

// Resource data storage (in production, this would be in a database)
let resourceData = {
    'core-docs': [
        {
            title: "Raspberry Pi 5",
            url: "https://www.raspberrypi.com/products/raspberry-pi-5/",
            type: "CPU: Quad Cortex-A76 @ 2.4GHz. GPU: VideoCore VII. RAM: 4GB/8GB LPDDR4X. Storage: microSD + PCIe SSD. PWM: 2 (software, STM32 recommended for precision). Interrupt Latency: 100-200µs. Camera: 2x MIPI CSI. Power: 8-12W. Cost: ~₹7,500.",
            description: "Real-time control (with STM32), basic AI/computer vision (8-12 FPS YOLOv5n CPU). Dev: ROS 2, OpenCV, Python on Raspberry Pi OS. Recommended for Stage 1 (low budget, basic mobility)."
        },
        {
            title: "NVIDIA Jetson Nano",
            url: "https://developer.nvidia.com/embedded/jetson-nano-developer-kit",
            type: "CPU: Quad Cortex-A57 @ 1.43GHz. GPU: 128-core Maxwell (CUDA). RAM: 4GB LPDDR4. Storage: 16GB eMMC + microSD. PWM: 0 (needs STM32). Interrupt Latency: 150-300µs. Camera: 4x MIPI CSI. AI: TensorRT (FP16). Power: 10-15W. Cost: ~₹13,500.",
            description: "AI/computer vision (15-20 FPS YOLOv5n GPU), SLAM (ORB-SLAM3 2.0m/s). Dev: CUDA, TensorRT, DeepStream with JetPack SDK. Recommended for AI-heavy autonomous bots."
        },
        {
            title: "Vicharak Vaaman",
            url: "https://vicharak.in/vaaman/",
            type: "CPU: Dual A72 + Quad A53 @ 1.8GHz. GPU: Mali-T864. FPGA: Efinix Trion T120 (112k LE). RAM: 4GB LPDDR4 + 1GB FPGA DDR3L. Storage: 64GB eMMC + microSD. PWM: 18+ (FPGA hardware, 0.5µs precision). Interrupt Latency: <10µs. Camera: CSI-2 + FPGA pre-processing. Power: 5-8W. Cost: ~₹12,000-₹15,000.",
            description: "Competition-edge real-time control due to FPGA. Dev: FPGA Verilog/VHDL (Efinity IDE), Yocto Linux. Recommended for Stage 2 (PoC with advanced features) and Grand Finale (combined with Jetson)."
        }
    ],
    'research': [
        {
            title: "OAK-D Lite",
            url: "https://shop.luxonis.com/products/oak-d-lite-1",
            type: "Camera/Depth Sensor",
            description: "Paired with Vaaman or Jetson for Stage 2 PoC, computer vision tasks."
        },
        {
            title: "Servos (18x)",
            url: "",
            type: "Actuator",
            description: "Hexapod leg movement, requiring precise PWM control."
        },
        {
            title: "IMU/LiDAR",
            url: "",
            type: "Navigation Sensors",
            description: "Sensor fusion (on Vaaman or Jetson) for SLAM and autonomous navigation."
        }
    ],
    'learning': [
        {
            title: "Processor Power Consumption",
            url: "",
            type: "RPi5: 8-12W; Jetson Nano: 10-15W; Vaaman: 5-8W",
            description: "Directly impacts battery selection, runtime, and thermal management strategy."
        },
        {
            title: "LiPo Battery (10Ah, 14.8V)",
            url: "",
            type: "Runtime (18 servos): Vaaman ~4.2h, RPi5 ~2.5h, Jetson ~1.8h",
            description: "Trade-offs between capacity, weight, C-rating, and physical size for hexapod integration."
        },
        {
            title: "Raspberry Pi 5 Add-on",
            url: "",
            type: "PoE+ HAT",
            description: "Allows for wired power, useful for development and stationary operation."
        },
        {
            title: "Jetson Nano Thermal",
            url: "",
            type: "Active cooling solution",
            description: "Necessary due to higher power draw, adds to system complexity and power budget."
        }
    ],
    'collab': [
        {
            title: "Efinity IDE",
            url: "https://www.efinixinc.com/products-efinity.html",
            type: "FPGA development (Verilog/VHDL) for Vicharak Vaaman's Efinix Trion T120.",
            description: "Typically bundled with Efinix development kits or licensed with FPGAs."
        },
        {
            title: "STM32CubeIDE/HAL",
            url: "https://www.st.com/en/development-tools/stm32cubeide.html",
            type: "Programming STM32 microcontrollers for precise PWM generation (RPi 5, Jetson Nano aux).",
            description: "Free IDE from STMicroelectronics; MCU costs vary (e.g., ₹200-₹1000+)."
        },
        {
            title: "Yocto Project",
            url: "https://docs.yoctoproject.org/",
            type: "Building custom embedded Linux distributions, e.g., for Vicharak Vaaman.",
            description: "Open source; significant learning curve and development effort."
        },
        {
            title: "NVIDIA JetPack SDK",
            url: "https://developer.nvidia.com/embedded/jetpack",
            type: "Comprehensive SDK for Jetson Nano, including CUDA, TensorRT, DeepStream for AI.",
            description: "Free, provided by NVIDIA for Jetson platform."
        },
        {
            title: "Raspberry Pi OS & Tools",
            url: "https://www.raspberrypi.com/documentation/",
            type: "OS and associated libraries (GPIOZero, Python libs) for RPi 5 development.",
            description: "Free, standard for Raspberry Pi boards."
        }
    ],
    'vendor': [
        {
            title: "STM32 HAL Programming",
            url: "https://www.st.com/en/development-tools/stm32cubeide.html",
            type: "Tutorial/Documentation",
            description: "STM32CubeIDE Tutorials for microcontroller programming and PWM generation"
        },
        {
            title: "FPGA Development",
            url: "https://www.efinixinc.com/products-efinity.html",
            type: "IDE/Documentation",
            description: "Efinity IDE Documentation for FPGA development on Vicharak Vaaman"
        },
        {
            title: "Yocto Project",
            url: "https://docs.yoctoproject.org/",
            type: "Documentation",
            description: "Yocto Project Documentation for custom Linux distributions"
        },
        {
            title: "NVIDIA JetPack SDK",
            url: "https://developer.nvidia.com/embedded/jetpack",
            type: "SDK/Documentation",
            description: "JetPack SDK Docs for Jetson development with CUDA, TensorRT, DeepStream"
        },
        {
            title: "Raspberry Pi OS",
            url: "https://www.raspberrypi.com/documentation/",
            type: "Documentation",
            description: "Raspberry Pi Documentation and GPIO programming guides"
        },
        {
            title: "Power Management",
            url: "https://www.ti.com/power-management/battery-management/overview.html",
            type: "Design Guide",
            description: "TI Power Design Guide for battery management and power systems"
        },
        {
            title: "Sensor Integration",
            url: "https://www.invensense.com/products/motion-tracking/6-axis/mpu-6050/",
            type: "Datasheet",
            description: "MPU6050 Datasheet and integration guides for IMU sensors"
        }
    ]
};

// Modal management
let currentResourceType = '';
let currentEditIndex = -1;

// Initialize resource manager
// Ensure initial resources are rendered on page load
// (Call refreshResourceTable for each resource type after DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
    setupModalEvents();
    loadInitialResources();
    // Render all resource tables with initial data for both default and electronics.html table IDs
    ['core-docs', 'research', 'collab', 'learning', 'vendor'].forEach(refreshResourceTable);
    Object.entries(tableIdToResourceType).forEach(([tbodyId, resourceType]) => {
        refreshResourceTable(resourceType, tbodyId);
    });
});

// Helper: Map table DOM IDs to resourceData keys
const tableIdToResourceType = {
    'mc-processors-tbody': 'core-docs',
    'sensors-actuators-tbody': 'research',
    'power-management-tbody': 'learning',
    'eda-tools-tbody': 'collab',
    'dev-resources-tbody': 'vendor'
};

// Setup modal event listeners
function setupModalEvents() {
    const modal = document.getElementById('resourceModal');
    const closeBtn = modal?.querySelector('.close');
    const form = document.getElementById('resourceForm');

    if (closeBtn) {
        closeBtn.onclick = function() {
            closeResourceModal();
        };
    }

    if (modal) {
        window.onclick = function(event) {
            if (event.target === modal) {
                closeResourceModal();
            }
        };
    }

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            saveResource();
        };
    }
}

// Load initial resources from HTML tables
function loadInitialResources() {
    const tables = [
        'core-docs',
        'research', 
        'collab',
        'learning',
        'vendor'
    ];

    tables.forEach(tableId => {
        const tbody = document.getElementById(`${tableId}-tbody`);
        if (tbody) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach((row, index) => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 3) {
                    const resourceItem = {
                        title: cells[0].textContent.trim(),
                        url: cells[0].querySelector('a')?.href || '',
                        type: cells[1].textContent.trim(),
                        description: cells[2].textContent.trim()
                    };
                    if (!resourceData[tableId]) resourceData[tableId] = [];
                    resourceData[tableId].push(resourceItem);
                }
            });
        }
    });
}

// Create and show the resource modal (add/edit)
function showResourceModal(isEdit = false, resourceType = '', resource = null, index = -1) {
    // Remove any existing modal
    document.querySelectorAll('.modal.resource-modal').forEach(m => m.remove());
    const modal = document.createElement('div');
    modal.className = 'modal resource-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${isEdit ? 'Edit' : 'Add'} Resource</h3>
                <button class="btn btn--sm btn--secondary modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="resourceForm">
                    <div class="form-group">
                        <label for="resourceTitle">Title:</label>
                        <input type="text" id="resourceTitle" value="${resource ? resource.title : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="resourceUrl">URL:</label>
                        <input type="url" id="resourceUrl" value="${resource ? resource.url : ''}" placeholder="https://example.com">
                    </div>
                    <div class="form-group">
                        <label for="resourceType">Type:</label>
                        <input type="text" id="resourceType" value="${resource ? resource.type : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="resourceDescription">Description:</label>
                        <textarea id="resourceDescription" rows="3" required>${resource ? resource.description : ''}</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn--secondary modal-close">Cancel</button>
                <button class="btn btn--primary" id="saveResourceBtn">${isEdit ? 'Update' : 'Add'} Resource</button>
                ${isEdit ? `<button class="btn btn--danger" id="deleteResourceBtn">Delete</button>` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal handlers
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    // Save handler
    modal.querySelector('#saveResourceBtn').onclick = function(e) {
        e.preventDefault();
        saveResourceModal(resourceType, index);
    };
    // Delete handler (edit only)
    if (isEdit && modal.querySelector('#deleteResourceBtn')) {
        modal.querySelector('#deleteResourceBtn').onclick = function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this resource?')) {
                deleteResource(resourceType, index);
                modal.remove();
            }
        };
    }
}

// Save resource from modal (add or edit)
function saveResourceModal(resourceType, index) {
    const title = document.getElementById('resourceTitle').value.trim();
    const url = document.getElementById('resourceUrl').value.trim();
    const type = document.getElementById('resourceType').value.trim();
    const description = document.getElementById('resourceDescription').value.trim();
    if (!title || !type || !description) {
        alert('Please fill in all required fields.');
        return;
    }
    const resourceItem = { title, url, type, description };
    if (!resourceData[resourceType]) resourceData[resourceType] = [];
    if (index >= 0) {
        resourceData[resourceType][index] = resourceItem;
    } else {
        resourceData[resourceType].push(resourceItem);
    }
    refreshResourceTable(resourceType);
    document.querySelector('.modal.resource-modal').remove();
}

// Refactor addResource and editResource to use modal
function addResource(resourceType) {
    showResourceModal(false, resourceType);
}
function editResource(resourceType, index) {
    const resource = resourceData[resourceType]?.[index];
    if (!resource) return;
    showResourceModal(true, resourceType, resource, index);
}

// Delete resource
function deleteResource(resourceType, index) {
    if (confirm('Are you sure you want to delete this resource?')) {
        if (!resourceData[resourceType]) resourceData[resourceType] = [];
        resourceData[resourceType].splice(index, 1);
        refreshResourceTable(resourceType);
    }
}

// Save resource (add or edit)
function saveResource() {
    const title = document.getElementById('resourceTitle').value.trim();
    const url = document.getElementById('resourceUrl').value.trim();
    const type = document.getElementById('resourceType').value.trim();
    const description = document.getElementById('resourceDescription').value.trim();
    
    if (!title || !type || !description) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const resourceItem = { title, url, type, description };
    
    if (!resourceData[currentResourceType]) {
        resourceData[currentResourceType] = [];
    }
    
    if (currentEditIndex >= 0) {
        // Edit existing resource
        resourceData[currentResourceType][currentEditIndex] = resourceItem;
    } else {
        // Add new resource
        resourceData[currentResourceType].push(resourceItem);
    }
    
    refreshResourceTable(currentResourceType);
    closeResourceModal();
}

// Close modal
function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentResourceType = '';
    currentEditIndex = -1;
}

// Refresh resource table
function refreshResourceTable(resourceType, overrideTbodyId) {
    const tbody = document.getElementById(overrideTbodyId || `${resourceType}-tbody`);
    if (!tbody || !resourceData[resourceType]) return;
    
    tbody.innerHTML = '';
    
    resourceData[resourceType].forEach((resource, index) => {
        const row = document.createElement('tr');
        
        // Create table cells based on resource type
        let cellsHtml = '';
        
        switch (resourceType) {
            case 'core-docs':
                cellsHtml = `
                    <td>${resource.url ? `<a href="${resource.url}" target="_blank">${resource.title}</a>` : resource.title}</td>
                    <td>${resource.type}</td>
                    <td>${resource.description}</td>
                `;
                break;
            case 'research':
                cellsHtml = `
                    <td>${resource.url ? `<a href="${resource.url}" target="_blank">${resource.title}</a>` : resource.title}</td>
                    <td>${resource.type}</td>
                    <td>${resource.description}</td>
                `;
                break;
            case 'collab':
                cellsHtml = `
                    <td>${resource.url ? `<a href="${resource.url}" target="_blank">${resource.title}</a>` : resource.title}</td>
                    <td>${resource.type}</td>
                    <td>${resource.description}</td>
                `;
                break;
            case 'learning':
                cellsHtml = `
                    <td>${resource.url ? `<a href="${resource.url}" target="_blank">${resource.title}</a>` : resource.title}</td>
                    <td>${resource.type}</td>
                    <td>${resource.description}</td>
                `;
                break;
            case 'vendor':
                cellsHtml = `
                    <td>${resource.url ? `<a href="${resource.url}" target="_blank">${resource.title}</a>` : resource.title}</td>
                    <td>${resource.type}</td>
                    <td>${resource.description}</td>
                `;
                break;
            default:
                cellsHtml = `
                    <td>${resource.url ? `<a href="${resource.url}" target="_blank">${resource.title}</a>` : resource.title}</td>
                    <td>${resource.type}</td>
                    <td>${resource.description}</td>
                `;
        }
        
        cellsHtml += `
            <td class="resource-actions">
                <button class="btn-icon" onclick="editResource('${resourceType}', ${index})"><i class="fas fa-edit"></i></button>
                <button class="btn-icon btn-danger" onclick="deleteResource('${resourceType}', ${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        row.innerHTML = cellsHtml;
        tbody.appendChild(row);
    });
}

// Export functions for global access
window.addResource = addResource;
window.editResource = editResource;
window.deleteResource = deleteResource;
window.closeResourceModal = closeResourceModal;
