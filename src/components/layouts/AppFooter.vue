<template>
  <footer class="py-12 mt-auto text-gray-300 bg-gray-900">
    <div class="max-w-[1440px] mx-auto px-4">
      <div class="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
        <!-- About Section -->
        <div>
          <div class="flex items-center mb-4 space-x-2">
            <div class="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white">PR!MA Ticket Manager</h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">
            A powerful and intuitive ticket management system designed for
            teams of all sizes. Streamline your workflow and boost
            productivity.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 font-semibold text-white">Quick Links</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="link in quickLinks" :key="link.text">
              <a :href="link.href" class="flex items-center space-x-2 transition-colors hover:text-white">
                <span>→</span>
                <span>{{ link.text }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Support & Legal -->
        <div>
          <h3 class="mb-4 font-semibold text-white">Support</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="link in supportLinks" :key="link.text">
              <a :href="link.href" class="flex items-center space-x-2 transition-colors hover:text-white">
                <span>→</span>
                <span>{{ link.text }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="pt-8 border-t border-gray-800">
        <div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <!-- Copyright -->
          <p class="text-sm text-center text-gray-400 md:text-left">
            &copy; {{ new Date().getFullYear() }} Ticket Manager Pro. All rights reserved.
          </p>

          <!-- Social Links -->
          <div class="flex space-x-4">
            <a v-for="icon in socialIcons" :key="icon.name" :href="icon.href"
              class="text-gray-400 transition-colors hover:text-white">
              <component :is="icon.svg" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  { text: 'About Us', href: '#' },
  { text: 'Features', href: '#' },
  { text: 'Pricing', href: '#' },
  { text: 'Contact', href: '#' },
]

const supportLinks = [
  { text: 'Help Center', href: '#' },
  { text: 'Documentation', href: '#' },
  { text: 'Privacy Policy', href: '#' },
  { text: 'Terms of Service', href: '#' },
]

// Inline SVG components for social icons
const socialIcons = [
  {
    name: 'Twitter',
    href: '#',
    svg: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
        1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 
        1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.924 2.206-4.924 
        4.924 0 .39.045.765.127 1.124C7.728 8.087 4.1 6.13 1.671 
        3.149c-.427.733-.666 1.58-.666 2.475 0 1.708.869 3.213 2.188 
        4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 
        4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 
        1.956 2.444 3.377 4.6 3.418-1.68 1.318-3.808 2.105-6.115 2.105-.397 
        0-.788-.023-1.175-.068 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 
        14.001-7.496 14.001-13.986 0-.21 0-.423-.015-.634.962-.689 
        1.8-1.56 2.46-2.548l-.047-.02z"/>
      </svg>`
    }
  },
  {
    name: 'GitHub',
    href: '#',
    svg: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.371 0 0 5.371 0 12c0 5.303 3.438 9.8 8.205 
        11.387.6.111.82-.261.82-.58 0-.287-.01-1.04-.016-2.04-3.338.726-4.042-1.608-4.042-1.608-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 
        1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.932 
        0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.291-1.552 3.297-1.23 
        3.297-1.23.654 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.096.823 2.209 
        0 1.595-.014 2.882-.014 3.273 0 .321.218.694.825.577C20.565 21.796 24 17.3 24 12 24 5.371 18.627 0 12 0z"/>
      </svg>`
    }
  },
  {
    name: 'LinkedIn',
    href: '#',
    svg: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 
        5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 
        19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 
        1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 
        11.25h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 
        2.5v5.5h-3v-10h3v1.354c.858-1.243 2.329-2.354 4-2.354 2.481 
        0 4.5 2.019 4.5 4.5v6.5z"/>
      </svg>`
    }
  },
]

</script>
