import html5 from '@/assets/tech/html5.png'
import css3 from '@/assets/tech/css3.png'
import sass from '@/assets/tech/sass.svg'
import bootstrap from '@/assets/tech/bootstrap.png'
import git from '@/assets/tech/git.png'
import javascript from '@/assets/tech/javascript.png'
import nextjs from '@/assets/tech/nextjs.svg'
import jira from '@/assets/tech/jira.svg'
import confluence from '@/assets/tech/confluence.svg'
import bitbucket from '@/assets/tech/bitbucket.svg'
import nodejs from '@/assets/tech/nodejs.svg'
import postgresql from '@/assets/tech/postgresql.svg'
import mysql from '@/assets/tech/mysql.svg'
import sqlServer from '@/assets/tech/sql-server.svg'
import supabase from '@/assets/tech/supabase.svg'
import json from '@/assets/tech/json.svg'
import vscode from '@/assets/tech/vscode.svg'
import tailwindcss from '@/assets/tech/tailwindcss.svg'
import github from '@/assets/tech/github.svg'
import claudeAi from '@/assets/tech/claude-ai-icon.svg'

export interface Skill {
  icon: string
  label: string
  alt: string
}

export const SKILLS: Skill[] = [
  { icon: html5, label: 'HTML', alt: 'HTML5' },
  { icon: css3, label: 'CSS', alt: 'CSS3' },
  { icon: sass, label: 'SASS', alt: 'Sass' },
  { icon: bootstrap, label: 'BT', alt: 'Bootstrap' },
  { icon: git, label: 'GIT', alt: 'Git' },
  { icon: javascript, label: 'JS', alt: 'JavaScript' },
  { icon: nextjs, label: 'NEXT', alt: 'Next.js' },
  { icon: jira, label: 'JIRA', alt: 'Jira' },
  { icon: confluence, label: 'CONFLUENCE', alt: 'Confluence' },
  { icon: bitbucket, label: 'BITBUCKET', alt: 'Bitbucket' },
  { icon: nodejs, label: 'NODE', alt: 'Node.js' },
  { icon: postgresql, label: 'POSTGRESQL', alt: 'PostgreSQL' },
  { icon: mysql, label: 'MYSQL', alt: 'MySQL' },
  { icon: sqlServer, label: 'SQL SERVER', alt: 'SQL Server' },
  { icon: supabase, label: 'SUPABASE', alt: 'Supabase' },
  { icon: json, label: 'JSON', alt: 'JSON' },
  { icon: vscode, label: 'VS CODE', alt: 'Visual Studio Code' },
  { icon: tailwindcss, label: 'TAILWIND', alt: 'Tailwind CSS' },
  { icon: github, label: 'GITHUB', alt: 'GitHub' },
  { icon: claudeAi, label: 'CLAUDE', alt: 'Claude AI' },
]
