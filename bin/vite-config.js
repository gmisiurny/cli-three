#! /usr/bin/env node

import shell from 'shelljs';
import process from 'process';

shell.config.silent = true;
const appName = process.env.PROJECT_NAME.toLowerCase();
const starter = process.env.PROJECT_STARTER.toLowerCase();
const cloneUrl = 'https://github.com/gmisiurny/three-experience.git';

switch (starter) {
case '':
case'vanilla':
	shell.exec(`npm create vite@latest ${appName} -- --template vanilla`);
	shell.cd(`${appName}`);
	shell.exec('npm install && npm install three && npm install lil-gui');
	shell.exec(`git clone ${cloneUrl}`);
	shell.exec('cd three-experience && rm -rf .git/');
	shell.sed('-i',
		'<div id="app"></div>',
		'<div id="app"></div>\n    <canvas class="webgl"></canvas>',
		'index.html'
	);
	shell.exec('echo \'const experience = new Experience(document.querySelector("canvas.webgl"))\' >> main.js');
	shell.sed(
		'-i',
		'import \'./style.css\'',
		'import \'./style.css\'\nimport Experience from \'./three-experience/Experience.js\'',
		'main.js'
	);
	break;
case 'vue':
	shell.exec(`npm create vite@latest ${appName} -- --template vue`);
	shell.cd(`${appName}`);
	shell.exec('npm install && npm install three && npm install lil-gui');
	shell.sed(
		'-i',
		'<div id="app"></div>',
		'<div id="app"></div>\n    <canvas class="webgl"></canvas>',
		'index.html'
	);
	shell.cd('src');
	shell.exec(`git clone ${cloneUrl}`);
	shell.cd('three-experience');
	shell.exec('rm -rf .git/');
	shell.cd('..');
	shell.exec('echo \'const experience = new Experience(document.querySelector("canvas.webgl"))\' >> main.js');
	shell.sed(
		'-i',
		'import App from \'./App.vue\'',
		'import App from \'./App.vue\'\nimport Experience from \'./three-experience/Experience.js\'',
		'main.js'
	);
	break;
case 'react':
	shell.exec(`npm create vite@latest ${appName} -- --template react`);
	shell.cd(`${appName}`);
	shell.exec('npm install && npm install three && npm install lil-gui');
	shell.sed(
		'-i',
		'<div id="root"></div>',
		'<div id="root"></div>\n    <canvas class="webgl"></canvas>',
		'index.html'
	);
	shell.cd('src');
	shell.exec(`git clone ${cloneUrl}`);
	shell.cd('three-experience');
	shell.exec('rm -rf .git/');
	shell.cd('..');
	shell.sed(
		'-i',
		'import \'./App.css\'',
		'import \'./App.css\'\nimport Experience from \'./three-experience/Experience.js\'',
		'App.jsx'
	);
	shell.sed(
		'-i',
		'export default App',
		'const experience = new Experience(document.querySelector("canvas.webgl"))\nexport default App',
		'App.jsx'
	);
	break;
default:
	break;
}
