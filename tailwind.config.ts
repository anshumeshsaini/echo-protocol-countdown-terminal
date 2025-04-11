
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					black: '#0D0D0D',
					darkgray: '#1A1A1A',
					gray: '#333333',
					green: '#00FF41',
					'green-glow': '#00FF4133',
					blue: '#0066FF',
					'blue-glow': '#0066FF33',
					red: '#FF0033',
					'red-glow': '#FF003333',
					purple: '#9900FF',
					'purple-glow': '#9900FF33'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '0.8',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.05)'
					}
				},
				'text-glitch': {
					'0%, 100%': { 
						transform: 'translate(0)', 
						textShadow: '0 0 0 rgba(0, 255, 65, 0)' 
					},
					'5%': { 
						transform: 'translate(-2px, 2px)', 
						textShadow: '2px 0 0 rgba(0, 255, 65, 0.5), -2px 0 0 rgba(255, 0, 51, 0.5)'
					},
					'10%': { 
						transform: 'translate(2px, -2px)' 
					},
					'15%': { 
						transform: 'translate(-1px, 1px)' 
					},
					'20%': { 
						transform: 'translate(1px, -1px)', 
						textShadow: '1px 0 0 rgba(0, 255, 65, 0.5), -1px 0 0 rgba(255, 0, 51, 0.5)'
					},
					'25%': { 
						transform: 'translate(-1px, -1px)' 
					}
				},
				'scanline': {
					'0%': { 
						transform: 'translateY(0%)' 
					},
					'100%': { 
						transform: 'translateY(100%)' 
					}
				},
				'rotate-sphere': {
					'0%': { 
						transform: 'rotateX(0deg) rotateY(0deg)' 
					},
					'100%': { 
						transform: 'rotateX(360deg) rotateY(360deg)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					}
				},
				'data-flow': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(-20px)'
					},
					'10%': { 
						opacity: '1' 
					},
					'90%': { 
						opacity: '1' 
					},
					'100%': { 
						opacity: '0', 
						transform: 'translateY(20px)'
					}
				},
				'flicker': {
					'0%, 100%': { 
						opacity: '1' 
					},
					'33%': { 
						opacity: '0.9' 
					},
					'66%': { 
						opacity: '0.95' 
					},
					'77%': { 
						opacity: '0.85' 
					}
				},
				'terminal-cursor': {
					'0%, 100%': { 
						opacity: '1' 
					},
					'50%': { 
						opacity: '0' 
					}
				},
				'apocalypse': {
					'0%': { 
						transform: 'scale(1)', 
						filter: 'brightness(1)' 
					},
					'50%': { 
						transform: 'scale(1.2)', 
						filter: 'brightness(1.5) hue-rotate(30deg)' 
					},
					'100%': { 
						transform: 'scale(0)', 
						filter: 'brightness(3) hue-rotate(60deg)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'text-glitch': 'text-glitch 3s infinite',
				'scanline': 'scanline 6s linear infinite',
				'rotate-sphere': 'rotate-sphere 15s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'data-flow': 'data-flow 5s linear infinite',
				'flicker': 'flicker 0.3s linear infinite',
				'terminal-cursor': 'terminal-cursor 1s step-end infinite',
				'apocalypse': 'apocalypse 2s ease-in forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
