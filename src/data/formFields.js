// Option lists for the lead-capture forms. Standard, static sets so the forms
// are usable and validatable without a backend; swap for API-driven lists
// once the Django backend serves them.

export const jobLevels = [
  'C-Level',
  'VP / SVP / EVP',
  'Director',
  'Manager',
  'Individual Contributor',
  'Consultant',
  'Student',
  'Other',
];

export const jobRoles = [
  'Security Operations',
  'Network Security',
  'Cloud Security',
  'IT Operations',
  'Executive / Leadership',
  'Compliance / Risk',
  'Other',
];

// Countries that reveal an extra sub-region field, mirroring the original
// markup's hidden #usa_list / #province_list / #zip_code / #department_field.
export const COUNTRY_US = 'United States';
export const COUNTRY_CANADA = 'Canada';
export const DEPARTMENT_COUNTRIES = ['Japan'];

export const countries = [
  'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia',
  'United Kingdom', 'Ireland', 'France', 'Germany', 'Netherlands', 'Belgium',
  'Luxembourg', 'Spain', 'Portugal', 'Italy', 'Switzerland', 'Austria', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Romania', 'Greece',
  'Turkey', 'Israel', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Egypt',
  'South Africa', 'Nigeria', 'Kenya', 'India', 'Pakistan', 'Singapore', 'Malaysia',
  'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'China', 'Hong Kong', 'Taiwan',
  'Japan', 'South Korea', 'Australia', 'New Zealand',
];

export const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

export const canadianProvinces = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Yukon',
];

// Same pattern the original inputs carry in their `pattern` attribute.
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
