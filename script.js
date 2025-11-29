(function () {
    const screen = document.getElementById('screen');

    const state = {
        user: 'Abdullah',
        history: [],
        historyIndex: -1
    };

    function promptText() {
        return `<span class="prompt glow">C:\\Users\\Abdullah</span><span class="accent">></span>`;
    }

    function focusCmd(){
        const cmd = document.getElementById('cmd');
        if(cmd){
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(cmd);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            cmd.focus();
        }
    }

    function appendPrompt(){
        const wrap = document.createElement('div');
        wrap.className = 'line prompt-line';
        wrap.innerHTML = `
            <div>${promptText()}</div>
            <div id="cmd" contenteditable="true" spellcheck="false"></div>
        `;
        screen.appendChild(wrap);
        screen.scrollTop = screen.scrollHeight;
        focusCmd();
    }

    function print(text, cls){
        const div = document.createElement('div');
        div.className = 'line' + (cls ? ' ' + cls : '');
        div.innerHTML = text;
        screen.appendChild(div);
        screen.scrollTop = screen.scrollHeight;
    }

    function printBranch(title, items){
        print(title + ':', 'yellow');
        print('');

        items.forEach(obj => {
            print(obj.name, 'tree-branch');
            obj.descriptions.forEach(d => print('- ' + d, 'tree-sub'));
            print('');
        });
    }

    const CV_PATH = 'assets/Mohd_Abdullah_Meraj_CV.pdf';
    const CV_FILENAME = 'Mohd_Abdullah_Meraj_CV.pdf';

    function triggerDownload(url, filename){
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.rel = 'noopener';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function escapeHtml(s){
        return s.replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
        }[c]));
    }

    function lockLine(lineEl){
        const input = lineEl.querySelector('#cmd');
        if(!input) return;
        const value = input.textContent;
        const frozen = document.createElement('div');
        frozen.className = 'line';
        frozen.innerHTML = `${promptText()} ${escapeHtml(value)}`;
        lineEl.replaceWith(frozen);
        return value;
    }

    const ASCII_ART = [
        `         /\\_/\\  
        ( o.o ) 
         > ^ <`
    ];

    function randomAscii() {
        return ASCII_ART[Math.floor(Math.random() * ASCII_ART.length)];
    }

    function handleCommand(input) {
        const cmd = input.trim().toLowerCase();

        switch (cmd) {
            case 'help':
                print(
                [
                    '<span class="yellow">Available commands</span>',
                    '  help         Show all commands',
                    '  about        Info about Abdullah',
                    '  exp          Experience timeline',
                    '  proj         List of projects',
                    '  pres         Leadership & achievements',
                    '  aca          Academic background',
                    '  ascii        Print a random ASCII shape',
                    '  download     Download CV'
                ].join('\n')
                );
                break;

            case 'about':
                print('┌─────────────────────────── ABOUT ───────────────────────────┐');
                print('│ Name: <span class="accent">Mohd. Abdullah Meraj</span>                                  │');
                print('│ Role: <span class="accent">Engineer + Designer + Storyteller</span>                     │');
                print('│ Location: <span class="accent">New Delhi, India</span>                                  │');
                print('└─────────────────────────────────────────────────────────────┘');

                printBranch('Information', [
                    {
                        name: "What I'm Known For",
                        descriptions: [
                            'Turning ideas into clean, intentional experiences.',
                            'Building fast without breaking clarity — MVP → polish.',
                            'Unofficial team glue — calm energy, great communication.'
                        ]
                    },
                    {
                        name: "Things I Build With",
                        descriptions: [
                            'C++, C, JS, TS, Python, React, Node.js, Express',
                            'MySQL, PostgreSQL, MongoDB, Prisma, Sequelize, REST APIs',
                            'NumPy, Pandas, Matplotlib',
                            'Figma, Canva, CorelDraw, design systems, prototypes'
                        ]
                    },
                    {
                        name: "Philosophy",
                        descriptions: [
                            'Design should feel intentional.',
                            'Ship fast, refine relentlessly.',
                            'Build with users in mind, not assumptions.'
                        ]
                    },
                    {
                        name: "Current Obsessions",
                        descriptions: [
                            'Winning hackathons & designathons.',
                            'Cleaner storytelling + better visual documentation.'
                        ]
                    },
                    {
                        name: "Contact",
                        descriptions: [
                            'Email: mohdabdullahmeraj1705@gmail.com',
                            'LinkedIn: <a href="https://www.linkedin.com/in/mohdabdullahmeraj/" target="_blank" class="accent">Mohd. Abdullah Meraj</a>',
                            'GitHub: <a href="https://github.com/mohdabdullahmeraj/" target="_blank" class="accent">Mohd. Abdullah Meraj</a>',
                            'Behance: <a href="https://www.behance.net/mohdameraj" target="_blank" class="accent">Mohd. Abdullah Meraj</a>'
                        ]
                    }
                ]);
                break;

            case 'exp':
                printBranch('Experience', [
                    { name: 'Full Stack Intern — Zenochi (Nov ’25 - Present)', descriptions: [] },
                    { name: 'UI/UX Intern — Banao Technologies (May ’24 - Present)', descriptions: [] },
                    { name: 'Software Development Intern — Ayanshtech Solutions (Jun ’25 - Sep ’25)', descriptions: [] },
                    { name: 'Graphic Design Intern — Texium Solutions (Apr ’24 - May ’24)', descriptions: [] },
                    { name: 'Student Partner — Internshala (May ’24 - June ’24)', descriptions: [] }
                ]);
                break;

            case 'proj':
                printBranch('Projects', [
                    {
                        name: '<a href="https://github.com/mohdabdullahmeraj/carbon-drivient" target="_blank" class="accent">Carbon Drivient</a>',
                        descriptions: [
                            'Full-stack carbon tracker with live emissions.',
                            'Fitness-app-inspired UI for sustainability.',
                            'Tech: React, Node.js, Express, MySQL, Sequelize'
                        ]
                    },
                    {
                        name: '<a href="https://www.figma.com/proto/dzVNsyG5zWuZqYciQw6Qop/UNDER-25-APP-UI_mohdabdullahmeraj?node-id=1-22&p=f&t=K8ebIFML4MjyB1uv-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A22" target="_blank" class="accent">XPulse</a>',
                        descriptions: [
                            'Immersive gamer dashboard experience.',
                            'Focused on accessibility, flow & clarity.',
                            'Bold visuals + structured layout system.'
                        ]
                    },
                    {
                        name: '<a href="https://www.figma.com/proto/rjXZLxGYQwQA6AHUsSsoRr/Mohd.-Abdullah-Meraj_DesignVerse?node-id=2187-5&p=f&t=4jEKUfvs83ehQRh4-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2187%3A5" target="_blank" class="accent">Under 25 App Redesign</a>',
                        descriptions: [
                            'Created design system for fast iteration.',
                            'Gen-Z expressive identity.',
                            'Highly reusable components & flows.'
                        ]
                    }
                ]);
                break;

            case 'pres':
                printBranch('Presence', [
                    {
                        name: 'Leadership & Achievements',
                        descriptions: [
                            'Vice President — Hashtag (Technical Club of JIMS)',
                            'Designed for Zomato, boAt & Third Wave Coffee',
                            'Judge at DeVyte 2.0',
                            '2× SIH Internal Round Winner',
                            'President — DevX (TIS, 22–23)'
                        ]
                    }
                ]);
                break;

            case 'aca':
                printBranch('Academics', [
                    {
                        name: 'Guru Gobind Singh Indraprastha University (23–27)',
                        descriptions: ['B.Tech CSE', 'CGPA: 9.382/10 (till 4th sem)']
                    },
                    {
                        name: 'Tagore International School',
                        descriptions: ['CBSE', 'Percentage: 94.4%']
                    }
                ]);
                break;

            case 'ascii':
                print(`<pre>${randomAscii()}</pre>`);
                break;

            case 'download':
                print('Downloaded', 'muted');
                triggerDownload(CV_PATH, CV_FILENAME);
                break;

            case '':
                break;

            default:
                print(`Command not recognized: <span class="red">${cmd}</span>`);
        }
    }

    screen.addEventListener('keydown', (e) => {
        const cmd = document.getElementById('cmd');
        if(!cmd) return;

        if(e.key === 'Enter'){
            e.preventDefault();
            const line = cmd.closest('.prompt-line');
            const value = cmd.textContent;
            state.history.unshift(value);
            state.historyIndex = -1;

            const frozenValue = lockLine(line);
            handleCommand(frozenValue);
            appendPrompt();
        }
    });

    screen.addEventListener('mousedown', () => setTimeout(focusCmd, 0));

    appendPrompt();
    
})();