config.load_autoconfig(False)

config.source('qutebrowser-themes/themes/onedark.py')


c.content.canvas_reading = False

c.content.webgl = False

c.content.canvas_reading = False

c.content.javascript.enabled = True

c.content.pdfjs = False

c.content.autoplay = False


# Enable adblocking
config.set('content.blocking.method', 'both')

# Adblock lists
c.content.blocking.adblock.lists = [
        "https://easylist.to/easylist/easylist.txt",
        "https://easylist.to/easylist/easyprivacy.txt",
        "https://easylist.to/easylist/fanboy-social.txt",
	"https://easylist.to/easylist/fanboy-annoyance.txt",
        "https://secure.fanboy.co.nz/fanboy-annoyance.txt",
        "https://easylist-downloads.adblockplus.org/abp-filters-anti-cv.txt",
        "https://pgl.yoyo.org/adservers/serverlist.php?showintro=0;hostformat=hosts",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/legacy.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters-2020.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters-2021.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters-2022.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters-2023.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters-2024.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/badware.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/privacy.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/badlists.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/annoyances.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/annoyances-cookies.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/annoyances-others.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/quick-fixes.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/resource-abuse.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/ubo-link-shorteners.txt",
	"https://github.com/uBlockOrigin/uAssets/raw/master/filters/ubol-filters.txt",
        "https://www.i-dont-care-about-cookies.eu/abp/",
        "https://secure.fanboy.co.nz/fanboy-cookiemonster.txt",
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/unbreak.txt",
	"https://raw.githubusercontent.com/bogachenko/fuckfuckadblock/master/fuckfuckadblock.txt",
        "https://raw.githubusercontent.com/Ewpratten/youtube_ad_blocklist/master/blocklist.txt",
        "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=1&mimetype=plaintext",
        "https://gitlab.com/curben/urlhaus-filter/-/raw/master/urlhaus-filter-online.txt",
	"https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt",
	"https://hblock.molinero.dev/hosts_adblock.txt"
        ]

c.content.blocking.enabled = True
c.content.blocking.hosts.lists = [
	"https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts",
	"https://raw.githubusercontent.com/mitchellkrogza/The-Big-List-of-Hacked-Malware-Web-Sites/master/hosts",
	"https://hblock.molinero.dev/hosts",
	"https://adaway.org/hosts.txt"
   	]

config.bind(',b', 'config-cycle content.blocking.enabled true false')


