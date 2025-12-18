import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, BscScanIcon, ListViewIcon, FarmIcon, MailIcon, RedditIcon, InstagramIcon, GitbookIcon, DiscordIcon, MediumIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  
];

export const socials = [
  {
    label: "Twitter(X)",
    icon: TwitterIcon,
    href: "https://x.com/MetaKeySwap",
  },
  {
    label: "Telegram Channel",
    icon: TelegramIcon,
    href: "https://t.me/MetaKeySwapDEX",
  },
  {
    label: "Telegram Group",
    icon: TelegramIcon,
    href: "https://t.me/metakeyswapgroup",
  },
  {
    label: "BSCScan",
    icon: BscScanIcon,
    href: "https://bscscan.com/token/0xCDAf21b8d0f7c17010626c18C81663f6c38D724c",
  },
  {
    label: "WhitePepar",
    icon: ListViewIcon,
    href: "https://drive.google.com/file/d/1wTeag5uBzaypdJflZmGtKBkM08pafswc/view",
  },
  {
    label: "Documentation",
    icon: GitbookIcon,
    href: "https://takarabako.gitbook.io/metakeyswap",
  },
  {
    label: "List token Farms",
    icon: FarmIcon,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSf409vpBq9SmIhg29gPp6sBFwe1ofcAdZ9uF7m-WW0B_3zKQA/viewform?usp=dialog",
  },
  {
    label: "Contact Support",
    icon: MailIcon,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=support@metakeyswap.com",
  },
  
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
