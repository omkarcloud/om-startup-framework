import re
from backend.messages import Messages

def isWeakPassword(data):
    return not (len(data["password"]) >= 8)

def validate_password_strength(data, errors):
    if "password" not in errors:
        is_weak = isWeakPassword(data)
        if is_weak:
            errors["password"] = Messages['AUTH_STRONGER_PASSWORD']

def errors_dict_to_string(errors):
    result = ''
    for key, value in errors.items():
        result = result + key + ': ' + value + '\n'
    return result.strip()


def normalize_django_errors(errors):
    for key, value in errors.items():
        errors[key] = value[0]
    return errors


def get_validation_errors(data, Serializer):
    serializer = Serializer(data=data)
    serializer.is_valid()
    errors = serializer.errors
    normalize_django_errors(errors)
    return errors



free_domains = ["blogspot.com",
                    "wordpress.com",
                    "weebly.com",
                    "wixsite.com",
                    "yolasite.com",
                    "biz.nf",
                    "co.cc",
                    "000webhostapp.com",
                    "freedomain.co.nr",
                    "freenom.com",
                    "cu.cc",
                    "dot.tk",
                    "ga",
                    "tk",
                    "ml",
                    "cf",
                    "gq",
                    "tk",
                    "ml",
                    "ga",
                    "cf",
                    "gq",
                    "cu.cc",
                    "co.vu",
                    "cy",
                    "cu.ma",
                    "cc.cx"]

temp_email_domains = ['freespam', 'tempmail', 'guerrillamail',
                          'mailinator', 'sharklasers', 'guerrillamailblock', 'getnada']



def is_temp_domain(domain):
    return any(domain.startswith(temp_domain) for temp_domain in temp_email_domains)

free_email_domains = ['gmail', 'yahoo', 'hotmail',
                          'aol', 'outlook', 'icloud', 'protonmail']
def is_free_email(domain):
    return any(domain.startswith(free_domain) for free_domain in free_email_domains)

def is_free_domain(domain):
    return any(domain.endswith(free_domain) for free_domain in free_domains)

def is_good_mail(email):
    # Regex pattern to match email domains
    domain_pattern = r'@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$'

    # Extract domain from email address
    domain = re.search(domain_pattern, email, re.IGNORECASE).group(0)[1:]

    domain = domain.strip(".")
    # Check if domain is a temporary email domain or free email domain
    if is_temp_domain(domain):
        return False
    elif is_free_domain(domain):
        return False
    else:
        return True

def is_company_email(email):
    # Regex pattern to match email domains
    domain_pattern = r'@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$'

    # Extract domain from email address
    domain = re.search(domain_pattern, email, re.IGNORECASE).group(0)[1:]

    domain = domain.strip(".")
    # Check if domain is a temporary email domain or free email domain
    if is_temp_domain(domain):
        return False
    elif is_free_email(domain):
        return False
    elif is_free_domain(domain):
        return False
    else:
        return True
