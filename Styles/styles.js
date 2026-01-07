import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // --- GERAL ---
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // --- HEADER / ONDAS ---
  headerBackground: {
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  wave: {
    backgroundColor: '#98c5de',
    height: 350,
    width: width * 1.5,
    borderRadius: 800,
    position: 'absolute',
    top: -160,
    left: -(width * 0.25),
    transform: [{ scaleX: 1.2 }],
  },

  // --- CONTEÚDO CADASTRO ---
  scrollContent: {
    paddingTop: 180,
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#607d8b',
    marginBottom: 40,
  },

  // --- INPUTS ---
  formArea: {
    width: '100%',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 8,
    height: 55,
    marginBottom: 25,
    paddingHorizontal: 15,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff', 
    paddingHorizontal: 5,
    zIndex: 1,
  },
  labelText: {
    color: '#757575',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
  },
  iconContainer: {
    marginLeft: 10,
  },
  iconText: {
    fontSize: 20,
    color: '#757575',
  },

  // --- BOTÕES E LINKS ---
  primaryButton: {
    backgroundColor: '#5d9cbf',
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  linkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  orText: {
    color: '#5d9cbf',
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  linkText: {
    color: '#5d9cbf',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  linkBold: {
    fontFamily: 'Poppins_700Bold',
  },
  secondaryButton: {
    backgroundColor: '#6caecf',
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },

  // --- ESTILOS ESPECÍFICOS DE LOGIN ---
  loginContainer: {
    flex: 1,
    backgroundColor: '#98c5de',
  },
  loginScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBackgroundCircleTop: {
    position: 'absolute',
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  loginBackgroundCircleBottom: {
    position: 'absolute',
    bottom: -100,
    right: -50,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  loginCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  loginTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#607d8b',
    textAlign: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#eef6fa',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 2,
  },
  backButtonText: {
    color: '#5d9cbf',
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
});