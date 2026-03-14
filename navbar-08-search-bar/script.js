document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const mobileSearch = document.getElementById('mobileSearch');
    const mobileSearchClose = document.getElementById('mobileSearchClose');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const menuLinks = document.querySelectorAll('.menu a');
    const searchTags = document.querySelectorAll('.search-tag');
    
    // Sample search data
    const searchData = {
        products: [
            'laptop', 'smartphone', 'headphones', 'keyboard', 
            'mouse', 'monitor', 'tablet', 'speaker', 'camera'
        ],
        blogs: [
            'tech news', 'reviews', 'tutorials', 'buying guide'
        ]
    };
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
        
        if (menu.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
            // Hide mobile search when menu is open
            mobileSearch.classList.remove('active');
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (window.innerWidth <= 768) {
                menu.classList.remove('show');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Search functionality
    function performSearch(query) {
        if (!query.trim()) {
            alert('Please enter a search term');
            return;
        }
        
        console.log('Searching for:', query);
        
        // Filter products based on search
        const results = searchData.products.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length > 0) {
            alert(`Found ${results.length} results for "${query}":\n${results.join('\n')}`);
        } else {
            alert(`No results found for "${query}"`);
        }
    }
    
    // Desktop search
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    // Mobile search
    mobileSearchBtn.addEventListener('click', function() {
        performSearch(mobileSearchInput.value);
        mobileSearch.classList.remove('active');
    });
    
    mobileSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
            mobileSearch.classList.remove('active');
        }
    });
    
    // Mobile search close
    mobileSearchClose.addEventListener('click', function() {
        mobileSearch.classList.remove('active');
    });
    
    // Show mobile search on hamburger long press or double click (optional)
    hamburger.addEventListener('dblclick', function() {
        if (window.innerWidth <= 768) {
            mobileSearch.classList.toggle('active');
            if (mobileSearch.classList.contains('active')) {
                mobileSearchInput.focus();
            }
        }
    });
    
    // Search suggestions based on input
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        if (value.length > 0) {
            // Filter suggestions
            const productMatches = searchData.products.filter(item => 
                item.includes(value)
            ).slice(0, 3);
            
            const blogMatches = searchData.blogs.filter(item => 
                item.includes(value)
            ).slice(0, 2);
            
            // Update suggestions dropdown (simplified)
            if (productMatches.length > 0 || blogMatches.length > 0) {
                searchSuggestions.style.display = 'block';
            } else {
                searchSuggestions.style.display = 'none';
            }
        } else {
            searchSuggestions.style.display = 'none';
        }
    });
    
    // Click on suggestion items
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.suggestion-text').textContent;
            searchInput.value = text;
            performSearch(text);
            searchSuggestions.style.display = 'none';
        });
    });
    
    // Click on search tags
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.textContent;
            if (window.innerWidth <= 768) {
                mobileSearchInput.value = text;
                performSearch(text);
                mobileSearch.classList.remove('active');
            } else {
                searchInput.value = text;
                performSearch(text);
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
                menu.classList.remove('show');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (!mobileSearch.contains(e.target) && !hamburger.contains(e.target)) {
                mobileSearch.classList.remove('active');
            }
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        const searchWrapper = document.querySelector('.search-wrapper');
        if (!searchWrapper.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            mobileSearch.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            mobileSearch.classList.remove('active');
            searchSuggestions.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Focus on search with keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (window.innerWidth <= 768) {
                mobileSearch.classList.add('active');
                mobileSearchInput.focus();
            } else {
                searchInput.focus();
            }
        }
    });
});