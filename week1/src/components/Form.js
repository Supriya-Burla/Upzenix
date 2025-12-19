import { useState } from "react";
import { useNavigate } from "react-router-dom";

const countries = [
  {name: "Afghanistan", code: "+93"},
  {name: "Albania", code: "+355"},
  {name: "Algeria", code: "+213"},
  {name: "Andorra", code: "+376"},
  {name: "Angola", code: "+244"},
  {name: "Antigua and Barbuda", code: "+1"},
  {name: "Argentina", code: "+54"},
  {name: "Armenia", code: "+374"},
  {name: "Australia", code: "+61"},
  {name: "Austria", code: "+43"},
  {name: "Azerbaijan", code: "+994"},
  {name: "Bahamas", code: "+1"},
  {name: "Bahrain", code: "+973"},
  {name: "Bangladesh", code: "+880"},
  {name: "Barbados", code: "+1"},
  {name: "Belarus", code: "+375"},
  {name: "Belgium", code: "+32"},
  {name: "Belize", code: "+501"},
  {name: "Benin", code: "+229"},
  {name: "Bhutan", code: "+975"},
  {name: "Bolivia", code: "+591"},
  {name: "Bosnia and Herzegovina", code: "+387"},
  {name: "Botswana", code: "+267"},
  {name: "Brazil", code: "+55"},
  {name: "Brunei", code: "+673"},
  {name: "Bulgaria", code: "+359"},
  {name: "Burkina Faso", code: "+226"},
  {name: "Burundi", code: "+257"},
  {name: "Cabo Verde", code: "+238"},
  {name: "Cambodia", code: "+855"},
  {name: "Cameroon", code: "+237"},
  {name: "Canada", code: "+1"},
  {name: "Central African Republic", code: "+236"},
  {name: "Chad", code: "+235"},
  {name: "Chile", code: "+56"},
  {name: "China", code: "+86"},
  {name: "Colombia", code: "+57"},
  {name: "Comoros", code: "+269"},
  {name: "Congo", code: "+242"},
  {name: "Costa Rica", code: "+506"},
  {name: "Croatia", code: "+385"},
  {name: "Cuba", code: "+53"},
  {name: "Cyprus", code: "+357"},
  {name: "Czech Republic", code: "+420"},
  {name: "Democratic People's Republic of Korea", code: "+850"},
  {name: "Democratic Republic of the Congo", code: "+243"},
  {name: "Denmark", code: "+45"},
  {name: "Djibouti", code: "+253"},
  {name: "Dominica", code: "+1"},
  {name: "Dominican Republic", code: "+1"},
  {name: "Ecuador", code: "+593"},
  {name: "Egypt", code: "+20"},
  {name: "El Salvador", code: "+503"},
  {name: "Equatorial Guinea", code: "+240"},
  {name: "Eritrea", code: "+291"},
  {name: "Estonia", code: "+372"},
  {name: "Eswatini", code: "+268"},
  {name: "Ethiopia", code: "+251"},
  {name: "Fiji", code: "+679"},
  {name: "Finland", code: "+358"},
  {name: "France", code: "+33"},
  {name: "Gabon", code: "+241"},
  {name: "Gambia", code: "+220"},
  {name: "Georgia", code: "+995"},
  {name: "Germany", code: "+49"},
  {name: "Ghana", code: "+233"},
  {name: "Greece", code: "+30"},
  {name: "Grenada", code: "+1"},
  {name: "Guatemala", code: "+502"},
  {name: "Guinea", code: "+224"},
  {name: "Guinea-Bissau", code: "+245"},
  {name: "Guyana", code: "+592"},
  {name: "Haiti", code: "+509"},
  {name: "Honduras", code: "+504"},
  {name: "Hungary", code: "+36"},
  {name: "Iceland", code: "+354"},
  {name: "India", code: "+91"},
  {name: "Indonesia", code: "+62"},
  {name: "Iran", code: "+98"},
  {name: "Iraq", code: "+964"},
  {name: "Ireland", code: "+353"},
  {name: "Israel", code: "+972"},
  {name: "Italy", code: "+39"},
  {name: "Jamaica", code: "+1"},
  {name: "Japan", code: "+81"},
  {name: "Jordan", code: "+962"},
  {name: "Kazakhstan", code: "+7"},
  {name: "Kenya", code: "+254"},
  {name: "Kiribati", code: "+686"},
  {name: "Kuwait", code: "+965"},
  {name: "Kyrgyzstan", code: "+996"},
  {name: "Laos", code: "+856"},
  {name: "Latvia", code: "+371"},
  {name: "Lebanon", code: "+961"},
  {name: "Lesotho", code: "+266"},
  {name: "Liberia", code: "+231"},
  {name: "Libya", code: "+218"},
  {name: "Liechtenstein", code: "+423"},
  {name: "Lithuania", code: "+370"},
  {name: "Luxembourg", code: "+352"},
  {name: "Madagascar", code: "+261"},
  {name: "Malawi", code: "+265"},
  {name: "Malaysia", code: "+60"},
  {name: "Maldives", code: "+960"},
  {name: "Mali", code: "+223"},
  {name: "Malta", code: "+356"},
  {name: "Marshall Islands", code: "+692"},
  {name: "Mauritania", code: "+222"},
  {name: "Mauritius", code: "+230"},
  {name: "Mexico", code: "+52"},
  {name: "Micronesia", code: "+691"},
  {name: "Moldova", code: "+373"},
  {name: "Monaco", code: "+377"},
  {name: "Mongolia", code: "+976"},
  {name: "Montenegro", code: "+382"},
  {name: "Morocco", code: "+212"},
  {name: "Mozambique", code: "+258"},
  {name: "Myanmar", code: "+95"},
  {name: "Namibia", code: "+264"},
  {name: "Nauru", code: "+674"},
  {name: "Nepal", code: "+977"},
  {name: "Netherlands", code: "+31"},
  {name: "New Zealand", code: "+64"},
  {name: "Nicaragua", code: "+505"},
  {name: "Niger", code: "+227"},
  {name: "Nigeria", code: "+234"},
  {name: "North Korea", code: "+850"},
  {name: "North Macedonia", code: "+389"},
  {name: "Norway", code: "+47"},
  {name: "Oman", code: "+968"},
  {name: "Pakistan", code: "+92"},
  {name: "Palau", code: "+680"},
  {name: "Palestine", code: "+970"},
  {name: "Panama", code: "+507"},
  {name: "Papua New Guinea", code: "+675"},
  {name: "Paraguay", code: "+595"},
  {name: "Peru", code: "+51"},
  {name: "Philippines", code: "+63"},
  {name: "Poland", code: "+48"},
  {name: "Portugal", code: "+351"},
  {name: "Qatar", code: "+974"},
  {name: "Romania", code: "+40"},
  {name: "Russia", code: "+7"},
  {name: "Rwanda", code: "+250"},
  {name: "Saint Kitts and Nevis", code: "+1"},
  {name: "Saint Lucia", code: "+1"},
  {name: "Saint Vincent and the Grenadines", code: "+1"},
  {name: "Samoa", code: "+685"},
  {name: "San Marino", code: "+378"},
  {name: "Sao Tome and Principe", code: "+239"},
  {name: "Saudi Arabia", code: "+966"},
  {name: "Senegal", code: "+221"},
  {name: "Serbia", code: "+381"},
  {name: "Seychelles", code: "+248"},
  {name: "Sierra Leone", code: "+232"},
  {name: "Singapore", code: "+65"},
  {name: "Slovakia", code: "+421"},
  {name: "Slovenia", code: "+386"},
  {name: "Solomon Islands", code: "+677"},
  {name: "Somalia", code: "+252"},
  {name: "South Africa", code: "+27"},
  {name: "South Korea", code: "+82"},
  {name: "South Sudan", code: "+211"},
  {name: "Spain", code: "+34"},
  {name: "Sri Lanka", code: "+94"},
  {name: "Sudan", code: "+249"},
  {name: "Suriname", code: "+597"},
  {name: "Sweden", code: "+46"},
  {name: "Switzerland", code: "+41"},
  {name: "Syria", code: "+963"},
  {name: "Taiwan", code: "+886"},
  {name: "Tajikistan", code: "+992"},
  {name: "Tanzania", code: "+255"},
  {name: "Thailand", code: "+66"},
  {name: "Timor-Leste", code: "+670"},
  {name: "Togo", code: "+228"},
  {name: "Tonga", code: "+676"},
  {name: "Trinidad and Tobago", code: "+1"},
  {name: "Tunisia", code: "+216"},
  {name: "Turkey", code: "+90"},
  {name: "Turkmenistan", code: "+993"},
  {name: "Tuvalu", code: "+688"},
  {name: "Uganda", code: "+256"},
  {name: "Ukraine", code: "+380"},
  {name: "United Arab Emirates", code: "+971"},
  {name: "United Kingdom", code: "+44"},
  {name: "United States", code: "+1"},
  {name: "Uruguay", code: "+598"},
  {name: "Uzbekistan", code: "+998"},
  {name: "Vanuatu", code: "+678"},
  {name: "Vatican City", code: "+379"},
  {name: "Venezuela", code: "+58"},
  {name: "Vietnam", code: "+84"},
  {name: "Yemen", code: "+967"},
  {name: "Zambia", code: "+260"},
  {name: "Zimbabwe", code: "+263"}
];

function Form() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // ✅ UPDATED VALIDATION FUNCTION
  const validate = (currentForm = form) => {
    let err = {};

    if (!currentForm.firstName) err.firstName = "First Name required";
    if (!currentForm.lastName) err.lastName = "Last Name required";
    if (!currentForm.username) err.username = "Username required";

    if (!/^\S+@\S+\.\S+$/.test(currentForm.email))
      err.email = "Invalid email";

    if (currentForm.password.length < 6)
      err.password = "Min 6 characters";

    if (!/^\d{10}$/.test(currentForm.phone))
      err.phone = "Phone must be 10 digits";

    if (!currentForm.country) err.country = "Country required";
    if (!currentForm.city) err.city = "City required";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(currentForm.pan))
      err.pan = "PAN must be 10 alphanumeric characters (e.g., ABCDE1234F)";

    if (!/^\d{12}$/.test(currentForm.aadhaar))
      err.aadhaar = "Invalid Aadhaar";

    setErrors(err);
    const valid = Object.keys(err).length === 0;
    setIsFormValid(valid);
    return valid;
  };

  const handleChange = (e) => {
    const value = e.target.name === 'pan' ? e.target.value.toUpperCase() : e.target.value;
    const newForm = { ...form, [e.target.name]: value };
    setForm(newForm);
    validate(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: { ...form, phone: form.countryCode + form.phone } });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* First Name */}
        <label style={styles.label}>First Name <span style={styles.required}>*</span></label>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          style={errors.firstName ? styles.error : styles.input}
        />
        {errors.firstName && <small style={styles.errorText}>{errors.firstName}</small>}

        {/* Last Name */}
        <label style={styles.label}>Last Name <span style={styles.required}>*</span></label>
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          style={errors.lastName ? styles.error : styles.input}
        />
        {errors.lastName && <small style={styles.errorText}>{errors.lastName}</small>}

        {/* Username */}
        <label style={styles.label}>Username <span style={styles.required}>*</span></label>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={errors.username ? styles.error : styles.input}
        />
        {errors.username && <small style={styles.errorText}>{errors.username}</small>}

        {/* Email */}
        <label style={styles.label}>Email <span style={styles.required}>*</span></label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={errors.email ? styles.error : styles.input}
        />
        {errors.email && <small style={styles.errorText}>{errors.email}</small>}

        {/* Password */}
        <label style={styles.label}>Password <span style={styles.required}>*</span></label>
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={errors.password ? styles.error : styles.input}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <small style={styles.errorText}>{errors.password}</small>}

        {/* Phone */}
        <label style={styles.label}>Phone <span style={styles.required}>*</span></label>
        <div style={styles.phoneContainer}>
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select Country Code</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={errors.phone ? { ...styles.input, ...styles.phoneInput } : { ...styles.input, ...styles.phoneInput }}
          />
        </div>
        {errors.phone && <small style={styles.errorText}>{errors.phone}</small>}

        {/* Country */}
        <label style={styles.label}>Country <span style={styles.required}>*</span></label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          style={errors.country ? styles.error : styles.input}
        >
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <small style={styles.errorText}>{errors.country}</small>}

        {/* City */}
        <label style={styles.label}>City <span style={styles.required}>*</span></label>
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          style={errors.city ? styles.error : styles.input}
        />
        {errors.city && <small style={styles.errorText}>{errors.city}</small>}

        {/* PAN */}
        <label style={styles.label}>PAN <span style={styles.required}>*</span></label>
        <input
          name="pan"
          placeholder="PAN (ABCDE1234F)"
          value={form.pan}
          onChange={handleChange}
          style={errors.pan ? styles.error : styles.input}
        />
        {errors.pan && <small style={styles.errorText}>{errors.pan}</small>}

        {/* Aadhaar */}
        <label style={styles.label}>Aadhaar <span style={styles.required}>*</span></label>
        <input
          name="aadhaar"
          placeholder="Aadhaar (12 digits)"
          value={form.aadhaar}
          onChange={handleChange}
          style={errors.aadhaar ? styles.error : styles.input}
        />
        {errors.aadhaar && <small style={styles.errorText}>{errors.aadhaar}</small>}

        <button type="submit" disabled={!isFormValid} style={styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px"
  },
  required: {
    color: "red"
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #999",
    marginBottom: "10px"
  },
  error: {
    padding: "10px",
    borderRadius: "4px",
    border: "2px solid red",
    marginBottom: "10px"
  },
  errorText: {
    color: "red",
    fontSize: "12px"
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px"
  },
  phoneContainer: {
    display: "flex",
    marginBottom: "10px"
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #999",
    marginRight: "10px",
    width: "150px"
  },
  phoneInput: {
    flex: 1
  },
  submit: {
    padding: "10px",
    background: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Form;
