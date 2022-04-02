import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';

export const colorReq = (elt) => chalk.blueBright(elt);
export const colorOpt = (elt) => chalk.yellow(elt);

export const title = gradient.cristal.multiline(figlet.textSync('cli-three'.toUpperCase(), {
	font: 'DOS Rebel',
	horizontalLayout: 'full',
	verticalLayout: 'default',
	width: 120,
	whitespaceBreak: true
}));

export const description = gradient.cristal.multiline(
	`
        THREE-CLI is a command line interface 
        wich provides three.js template over 
        "vanilla", Vue or React application 
        running with Vite        
        `
);
