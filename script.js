document.addEventListener('DOMContentLoaded', () => {
    // Define the containers and their corresponding book names
    const containers = [
        { containerIndex: 0, bookName: 'भगवत-गीता-साधक-संजीवनी' },
        { containerIndex: 1, bookName: 'अष्टावक्र-गीता' },
        { containerIndex: 2, bookName: 'ishvara-gita'},
        { containerIndex: 3, bookName: 'आजगर-गीता'},
        { containerIndex: 4, bookName: ''}


        // Add more container-book mappings as needed
    ];

    // Loop through the containers and set up image fetching for each
    containers.forEach(container => {
        const imageContainer = document.getElementById(`image-container-${container.containerIndex}`);
        let currentPage = 1;
        let isLoading = false;
        let bookID = ''; 
        let pages = 0; 

        const fetchImages = async () => {
            if (isLoading) return;
            isLoading = true;

            try {
                const response = await fetch(`https://backend.veducation.world/user/getFolder/${container.bookName}`, { 
                    headers: { 
                        // Your headers her{ 
                'authority': 'www.veducation.world', 
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
                'accept-language': 'en-US,en;q=0.9,en-IN;q=0.8', 
                'cache-control': 'max-age=0', 
                'cookie': '_ga=GA1.1.234653434.1710776082; _hjSessionUser_3808085=eyJpZCI6IjVhOTI3OGMzLTBkYTQtNTA4NS1hNWI3LWNmMDQwMjQ0ZDI3NiIsImNyZWF0ZWQiOjE3MTA3NzYwODEyNTcsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_3808085=eyJpZCI6ImY2MzUzZDY5LTAyOWUtNGUzMy1hZDg1LTEyZGU4NjE5NGNjNyIsImMiOjE3MTA4NjEzNTA0MDQsInMiOjEsInIiOjEsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _clck=admhjx%7C2%7Cfk7%7C0%7C1538; _ga_PMF55E8NLR=GS1.1.1710861352.2.0.1710861352.0.0.0; _clsk=1hizoad%7C1710861352953%7C1%7C1%7Ca.clarity.ms%2Fcollect', 
                'referer': 'https://www.bing.com/', 
                'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"Windows"', 
                'sec-fetch-dest': 'document', 
                'sec-fetch-mode': 'navigate', 
                'sec-fetch-site': 'same-origin', 
                'sec-fetch-user': '?1', 
                'upgrade-insecure-requests': '1', 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0', 
                'Referer': 'https://www.veducation.world/', 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0', 
                'Accept': '*/*', 
                'Accept-Language': 'en-US,en;q=0.9,en-IN;q=0.8', 
                'Connection': 'keep-alive',  
                'Sec-Fetch-Dest': 'script', 
                'Sec-Fetch-Mode': 'no-cors', 
                'Sec-Fetch-Site': 'cross-site',  
                'Origin': 'https://www.veducation.world', 
                'origin': 'https://www.veducation.world',
              
                    } 
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                bookID = data.Folder._id;
                pages = data.Folder.page;

                for (let i = currentPage; i <= pages && i < currentPage + 5; i++) {
                    const imgElement = document.createElement('img');
                    imgElement.src = `https://media.veducation.world/converted-jpg/${bookID}/${i}.jpg`;
                    imageContainer.appendChild(imgElement);
                }
                currentPage += 5;
                isLoading = false;

                if (currentPage > pages) {
                    window.removeEventListener('scroll', handleScroll);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (clientHeight + scrollTop >= scrollHeight - 5 && !isLoading) {
                fetchImages();
            }
        };

        window.addEventListener('scroll', handleScroll);
        fetchImages(); // Initial call to load the first set of images
    });
});