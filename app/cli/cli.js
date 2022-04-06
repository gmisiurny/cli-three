#! /usr/bin/env node

import {
	title,
	colorOpt,
	colorReq,
	description
} from '../utils/cli-utils.js';


import prog from 'caporal';
import shell from 'shelljs';
import process from 'process';
import gradient from 'gradient-string';

export const cli = () => {
	const start = Date.now();
	prog
		.version('1.0.3')
		.name(title)
		.description(description);

	prog
		.command('init', 'Init project')
		.help(
			`
            ex: init ${colorReq('my-cli-name')} ${colorOpt('--conf vanilla')}
            ex: init ${colorReq('my-cli-name')} ${colorOpt('--conf vue')}
            ex: init ${colorReq('my-cli-name')} ${colorOpt('--conf react')}
            `
		)
		.argument(
			'<name>',
			'Name of your project',
			/\w/
		)
		.option(
			'--conf <conf>',
			'Configuration <conf> you want to use (default is vanilla)',
			prog.STRING
		)
		.action((args, options, logger) => {
			const {name} = args;
			process.env.PROJECT_NAME = name;
			process.env.PROJECT_STARTER = options.conf ? options.conf : 'vanilla';
			logger.info(gradient.cristal.multiline('Initializing new setup...'));
			shell.exec('vite-starter');
			const duration = (Date.now() - start) / 1000;
			logger.info(gradient.summer.multiline(`\nSetup done in: ${duration}s !\n`));

			logger.info(`cd ${name}`);
			logger.info('npm run dev');
			logger.info('http://localhost:3000/#debug to activate debug mode\n');

		});

	prog.parse(process.argv);
};
