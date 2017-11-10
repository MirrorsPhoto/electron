<template>
  <span>
    <svg style="position: absolute; width: 0; height: 0;" width="0" height="0">
    	<symbol id="thunder" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g class="am-weather-cloud-1">
    				<path d="M47.7,35.4 c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.light" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-10,-6), scale(0.6)" /> </g>
    			<g>
    				<path d="M47.7,35.4 c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    			<g transform="translate(-9,28), scale(1.2)">
    				<polygon class="am-weather-stroke" :fill="colors.primary" stroke="white" stroke-width="1" points="14.3,-2.9 20.5,-2.9 16.4,4.3 20.3,4.3 11.5,14.6 14.9,6.9 11.1,6.9" /> </g>
    		</g>
    	</symbol>
    	<symbol id="day" viewBox="0 0 64 64">
    		<g transform="translate(32,32)">
    			<g class="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
    				<g>
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(45)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(90)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(135)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(180)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(225)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(270)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				<g transform="rotate(315)">
    					<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    			</g>
    			<circle cx="0" cy="0" :fill="colors.primary" r="5" :stroke="colors.primary" stroke-width="2" /> </g>
    	</symbol>
    	<symbol id="cloudy-day-2" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g transform="translate(0,16)">
    				<g class="am-weather-sun">
    					<g>
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(45)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(90)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(135)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(180)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(225)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(270)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(315)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				</g>
    				<circle cx="0" cy="0" :fill="colors.primary" r="5" :stroke="colors.primary" stroke-width="2" /> </g>
    			<g class="am-weather-cloud-2">
    				<path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.light" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    		</g>
    	</symbol>
      <symbol id="cloudy-night-2" viewBox="0 0 64 64">
        <g transform="translate(20,10)">
          <g transform="translate(16,4), scale(0.8)">
            <g class="am-weather-moon-star-1">
              <polygon :fill="colors.primary" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" stroke-miterlimit="10"/>
            </g>
            <g class="am-weather-moon-star-2">
              <polygon :fill="colors.primary" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" stroke-miterlimit="10" transform="translate(20,10)"/>
            </g>
            <g class="am-weather-moon">
              <path d="M14.5,13.2c0-3.7,2-6.9,5-8.7   c-1.5-0.9-3.2-1.3-5-1.3c-5.5,0-10,4.5-10,10s4.5,10,10,10c1.8,0,3.5-0.5,5-1.3C16.5,20.2,14.5,16.9,14.5,13.2z" :fill="colors.primary" :stroke="colors.primary" stroke-linejoin="round" stroke-width="2"/>
            </g>
          </g>
          <g class="am-weather-cloud-2">
            <path d="M47.7,35.4    c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
          </g>
        </g>
      </symbol>
    	<symbol id="cloudy" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g class="am-weather-cloud-1">
    				<path d="M47.7,35.4 c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.light" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-10,-8), scale(0.6)" /> </g>
    			<g class="am-weather-cloud-2">
    				<path d="M47.7,35.4 c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    		</g>
    	</symbol>
    	<symbol id="rainy-3" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g transform="translate(0,16)">
    				<g class="am-weather-sun">
    					<g>
    						<line fifll="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(45)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(90)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(135)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(180)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(225)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(270)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(315)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				</g>
    				<circle cx="0" cy="0" :fill="colors.primary" r="5" :stroke="colors.primary" stroke-width="2" /> </g>
    			<g>
    				<path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    		</g>
    		<g transform="translate(34,46), rotate(10)">
    			<line class="am-weather-rain-1" fill="none" :stroke="colors.light" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(-6,1)" x1="0" x2="0" y1="0" y2="8" />
    			<line class="am-weather-rain-2" fill="none" :stroke="colors.light" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(0,-1)" x1="0" x2="0" y1="0" y2="8" /> </g>
    	</symbol>
    	<symbol id="rainy-5" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g>
    				<path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    		</g>
    		<g transform="translate(34,46), rotate(10)">
    			<line class="am-weather-rain-1" fill="none" :stroke="colors.light" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(-6,1)" x1="0" x2="0" y1="0" y2="8" />
    			<line class="am-weather-rain-2" fill="none" :stroke="colors.light" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(0,-1)" x1="0" x2="0" y1="0" y2="8" /> </g>
    	</symbol>
    	<symbol id="rainy-6" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g>
    				<path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    		</g>
    		<g transform="translate(31,46), rotate(10)">
    			<line class="am-weather-rain-1" fill="none" :stroke="colors.light" stroke-dasharray="4,4" stroke-linecap="round" stroke-width="2" transform="translate(-4,1)" x1="0" x2="0" y1="0" y2="8" />
    			<line class="am-weather-rain-2" fill="none" :stroke="colors.light" stroke-dasharray="4,4" stroke-linecap="round" stroke-width="2" transform="translate(0,-1)" x1="0" x2="0" y1="0" y2="8" />
    			<line class="am-weather-rain-1" fill="none" :stroke="colors.light" stroke-dasharray="4,4" stroke-linecap="round" stroke-width="2" transform="translate(4,0)" x1="0" x2="0" y1="0" y2="8" /> </g>
    	</symbol>
    	<symbol id="snowy-3" viewBox="0 0 64 64">
    		<g transform="translate(20,10)">
    			<g transform="translate(0,16)">
    				<g class="am-weather-sun">
    					<g>
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(45)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(90)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(135)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(180)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(225)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(270)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    					<g transform="rotate(315)">
    						<line fill="none" :stroke="colors.primary" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" /> </g>
    				</g>
    				<circle cx="0" cy="0" :fill="colors.primary" r="5" :stroke="colors.primary" stroke-width="2" /> </g>
    			<g>
    				<path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3 c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)" /> </g>
    			<g class="am-weather-snow-1">
    				<g transform="translate(7,28)">
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1.2" transform="translate(0,9), rotate(0)" x1="0" x2="0" y1="-2.5" y2="2.5" />
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(45)" x1="0" x2="0" y1="-2.5" y2="2.5" />
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(90)" x1="0" x2="0" y1="-2.5" y2="2.5" />
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(135)" x1="0" x2="0" y1="-2.5" y2="2.5" /> </g>
    			</g>
    			<g class="am-weather-snow-2">
    				<g transform="translate(16,28)">
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1.2" transform="translate(0,9), rotate(0)" x1="0" x2="0" y1="-2.5" y2="2.5" />
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(45)" x1="0" x2="0" y1="-2.5" y2="2.5" />
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(90)" x1="0" x2="0" y1="-2.5" y2="2.5" />
    					<line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(135)" x1="0" x2="0" y1="-2.5" y2="2.5" /> </g>
    			</g>
    		</g>
    	</symbol>
      <symbol id="snowy-5" viewBox="0 0 64 64">
        <g transform="translate(20,10)">
          <g class="snowy-6-2">
            <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" :fill="colors.medium" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
          </g>
          <g class="am-weather-snow-1">
            <g transform="translate(7,28)">
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1.2" transform="translate(0,9), rotate(0)" x1="0" x2="0" y1="-2.5" y2="2.5" />
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(45)" x1="0" x2="0" y1="-2.5" y2="2.5" />
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(90)" x1="0" x2="0" y1="-2.5" y2="2.5" />
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(135)" x1="0" x2="0" y1="-2.5" y2="2.5" />
            </g>
          </g>
          <g class="am-weather-snow-2">
            <g transform="translate(16,28)">
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1.2" transform="translate(0,9), rotate(0)" x1="0" x2="0" y1="-2.5" y2="2.5" />
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(45)" x1="0" x2="0" y1="-2.5" y2="2.5" />
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(90)" x1="0" x2="0" y1="-2.5" y2="2.5" />
              <line fill="none" :stroke="colors.medium" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(135)" x1="0" x2="0" y1="-2.5" y2="2.5" />
            </g>
          </g>
        </g>
      </symbol>
      <symbol id="night" viewBox="0 0 64 64">
        <g transform="translate(20,20)">
          <g class="am-weather-moon-star-1">
            <polygon :fill="colors.primary" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" stroke-miterlimit="10"/>
          </g>
          <g class="am-weather-moon-star-2">
            <polygon :fill="colors.primary" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" stroke-miterlimit="10" transform="translate(20,10)"/>
          </g>
          <g class="am-weather-moon">
            <path d="M14.5,13.2c0-3.7,2-6.9,5-8.7   c-1.5-0.9-3.2-1.3-5-1.3c-5.5,0-10,4.5-10,10s4.5,10,10,10c1.8,0,3.5-0.5,5-1.3C16.5,20.2,14.5,16.9,14.5,13.2z" :fill="colors.primary" :stroke="colors.primary" stroke-linejoin="round" stroke-width="2"/>
          </g>
        </g>
      </symbol>
    </svg>
    <svg class="icon"><use :xlink:href="'#' + icon "/></svg>
  </span>
</template>
<script>
export default {
  props: {
    code: {
      type: Number,
      required: true
    },
    timeOfDay: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      colors: {
        primary: '#E74C3C',
        light: '#F1F1F1',
        medium: '#BCBCBC'
      },
      icons: [
        { // Гроза
          day: 'thunder',
          night: 'thunder',
          codes: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
        },
        { // Дождь и пасмурно
          day: 'rainy-6',
          night: 'rainy-6',
          codes: [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531, 902, 906, 958, 959, 960, 961]
        },
        { // Дождь
          day: 'rainy-3',
          night: 'rainy-5',
          codes: [500, 501, 502, 503, 504]
        },
        { // Снег
          day: 'snowy-3',
          night: 'snowy-5',
          codes: [511, 600, 601, 602, 611, 612, 615, 616, 620, 621, 622]
        },
        { // Облачно
          day: 'cloudy-day-2',
          night: 'cloudy-night-2',
          codes: [701, 721, 731, 751, 801, 956, 957]
        },
        { // Сильно облачно
          day: 'cloudy',
          night: 'cloudy',
          codes: [711, 741, 761, 802, 803, 804, 905]
        },
        { // Чистое небо
          day: 'day',
          night: 'night',
          codes: [800, 903, 951, 952, 953, 954, 955]
        }
      ]
    }
  },
  computed: {
    icon() {
      const code = this.code || 800
      return this.icons.find(icon => icon.codes.includes(code))[this.timeOfDay]
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../styles_config.sass"

.icon
  width: 80px
  height: 80px
  margin: -25px
  margin-right: -15px

@keyframes am-weather-cloud-1
  0%
    transform: translate(-5px, 0px)
  50%
    transform: translate(10px, 0px)
  100%
    transform: translate(-5px, 0px)

.am-weather-cloud-1
  animation-name: am-weather-cloud-1
  animation-duration: 7s
  animation-timing-function: linear
  animation-iteration-count: infinite

@keyframes am-weather-cloud-2
  0%
    transform: translate(0px, 0px)
  50%
    transform: translate(2px, 0px)
  100%
    transform: translate(0px, 0px)

.am-weather-cloud-2
  animation-name: am-weather-cloud-2
  animation-duration: 3s
  animation-timing-function: linear
  animation-iteration-count: infinite

@keyframes am-weather-stroke
  0%
    transform: translate(0.0px, 0.0px)
  2%
    transform: translate(0.3px, 0.0px)
  4%
    transform: translate(0.0px, 0.0px)
  6%
    transform: translate(0.5px, 0.4px)
  8%
    transform: translate(0.0px, 0.0px)
  10%
    transform: translate(0.3px, 0.0px)
  12%
    transform: translate(0.0px, 0.0px)
  14%
    transform: translate(0.3px, 0.0px)
  16%
    transform: translate(0.0px, 0.0px)
  18%
    transform: translate(0.3px, 0.0px)
  20%
    transform: translate(0.0px, 0.0px)
  22%
    transform: translate(1px, 0.0px)
  24%
    transform: translate(0.0px, 0.0px)
  26%
    transform: translate(-1px, 0.0px)
  28%
    transform: translate(0.0px, 0.0px)
  40%
    fill: $primary-color
    transform: translate(0.0px, 0.0px)
  65%
    fill: white
    transform: translate(-1px, 5.0px)
  61%
    fill: $primary-color
  100%
    transform: translate(0.0px, 0.0px)

.am-weather-stroke
  animation-name: am-weather-stroke
  animation-duration: 1.11s
  animation-timing-function: linear
  animation-iteration-count: infinite

@keyframes am-weather-sun
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

.am-weather-sun
  animation-name: am-weather-sun
  animation-duration: 9s
  animation-timing-function: linear
  animation-iteration-count: infinite

@keyframes am-weather-sun-shiny
  0%
    stroke-dasharray: 3px 10px
    stroke-dashoffset: 0px
  50%
    stroke-dasharray: 0.1px 10px
    stroke-dashoffset: -1px
  100%
    stroke-dasharray: 3px 10px
    stroke-dashoffset: 0px

.am-weather-sun-shiny line
  animation-name: am-weather-sun-shiny
  animation-duration: 2s
  animation-timing-function: linear
  animation-iteration-count: infinite

@keyframes am-weather-rain
  0%
    stroke-dashoffset: 0
  100%
    stroke-dashoffset: -100

.am-weather-rain-1
  animation-name: am-weather-rain
  animation-duration: 8s
  animation-timing-function: linear
  animation-iteration-count: infinite

.am-weather-rain-2
  animation-name: am-weather-rain
  animation-delay: 0.25s
  animation-duration: 8s
  animation-timing-function: linear
  animation-iteration-count: infinite

@keyframes am-weather-snow
  0%
    transform: translateX(0) translateY(0)
  33.33%
    transform: translateX(-1.2px) translateY(2px)
  66.66%
    transform: translateX(1.4px) translateY(4px)
    opacity: 1
  100%
    transform: translateX(-1.6px) translateY(6px)
    opacity: 0

@keyframes am-weather-snow-reverse
  0%
    transform: translateX(0) translateY(0)
  33.33%
    transform: translateX(1.2px) translateY(2px)
  66.66%
    transform: translateX(-1.4px) translateY(4px)
    opacity: 1
  100%
    transform: translateX(1.6px) translateY(6px)
    opacity: 0

.am-weather-snow-1
  animation-name: am-weather-snow
  animation-duration: 2s
  animation-timing-function: linear
  animation-iteration-count: infinite

.am-weather-snow-2
  animation-name: am-weather-snow
  animation-delay: 1.2s
  animation-duration: 2s
  animation-timing-function: linear
  animation-iteration-count: infinite

.am-weather-snow-3
  animation-name: am-weather-snow-reverse
  animation-duration: 2s
  animation-timing-function: linear
  animation-iteration-count: infinite

.am-weather-easing-ease-in-out
  animation-timing-function: ease-in-out

@keyframes am-weather-moon
  0%
    transform: rotate(0deg)
  50%
    transform: rotate(15deg)
  100%
    transform: rotate(0deg)

.am-weather-moon
  animation-name: am-weather-moon
  animation-duration: 6s
  animation-timing-function: linear
  animation-iteration-count: infinite
  transform-origin: 12.5px 15.15px 0

@keyframes am-weather-moon-star
  0%
    opacity: 0
  100%
    opacity: 1

.am-weather-moon-star-1
  animation-name: am-weather-moon-star
  animation-delay: 3s
  animation-duration: 5s
  animation-timing-function: linear
  animation-iteration-count: 1

.am-weather-moon-star-2
  animation-name: am-weather-moon-star
  animation-delay: 5s
  animation-duration: 4s
  animation-timing-function: linear
  animation-iteration-count: 1

</style>
