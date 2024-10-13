/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	fontFamily: {
  		roboto: ['Roboto', 'sans-serif'],
  		inter: ['Inter', 'sans-serif']
  	},
  	extend: {
  		animation: {
  			'underline-in': 'underline-in 0.3s ease-in-out forwards',
  			'underline-out': 'underline-out 0.3s ease-in-out forwards',
  			shine: 'shine var(--duration) infinite linear'
  		},
  		keyframes: {
  			'underline-in': {
  				'0%': {
  					transform: 'scaleX(0)',
  					opacity: '0',
  					'transform-origin': 'right'
  				},
  				'100%': {
  					transform: 'scaleX(1)',
  					opacity: '1',
  					'transform-origin': 'right'
  				}
  			},
  			'underline-out': {
  				'0%': {
  					transform: 'scaleX(1)',
  					opacity: '1',
  					'transform-origin': 'left'
  				},
  				'99%': {
  					transform: 'scaleX(0)',
  					opacity: '1',
  					'transform-origin': 'left'
  				},
  				'100%': {
  					transform: 'scaleX(0)',
  					opacity: '0',
  					'transform-origin': 'left'
  				}
  			},
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			success: 'hsl(var(--success))',
  			hover: 'hsl(var(--text-hover))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
