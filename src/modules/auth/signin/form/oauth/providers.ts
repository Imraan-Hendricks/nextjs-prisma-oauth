import {
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { oauthProviders } from '../../../../../utils/constant';

function getIcon(
  provider:
    | 'facebook'
    | 'github'
    | 'google'
    | 'instagram'
    | 'linkedin'
    | 'tiktok'
    | 'twitter'
) {
  return provider === 'facebook'
    ? faFacebook
    : provider === 'github'
    ? faGithub
    : provider === 'google'
    ? faGoogle
    : provider === 'instagram'
    ? faInstagram
    : provider === 'linkedin'
    ? faLinkedin
    : provider === 'tiktok'
    ? faTiktok
    : provider === 'twitter'
    ? faTwitter
    : faRightToBracket;
}

function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getProviders() {
  return oauthProviders.map((provider) => {
    return {
      href: `/api/auth/oauth/${provider}`,
      icon: getIcon(provider),
      text: `Signin with ${capitalizeFirst(provider)}`,
    };
  });
}
