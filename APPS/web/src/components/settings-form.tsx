"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { BellIcon, LockIcon, SunIcon, UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"
import { Separator } from "./ui/separator"
import api from "@/services/api"
import { Checkbox } from "./ui/checkbox"
import { getAuthUser } from "@/lib/jwt";


const profileFormSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  dataNascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de nascimento inválida.",
  }),
  cpf: z.string().min(11, {
    message: "CPF deve ter 11 caracteres.",
  }),
  telefone: z.string().optional(),
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  enderecoFoto: z.string().url({ message: "Por favor, insira uma URL válida." }).optional(),
  caoGuia: z.boolean().default(false).optional(),
  cep: z.string().optional(),
  bairro: z.string().optional(),
  rua: z.string().optional(),
  numeroEndereco: z.string().optional(),
  cidade_Id: z.number().int().optional(),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["default", "comfortable", "compact"], {
    required_error: "Please select a font size.",
  }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(false).optional(),
  pushNotifications: z.boolean().default(false).optional(),
  newProposals: z.boolean().default(false).optional(),
  newComments: z.boolean().default(false).optional(),
  mentions: z.boolean().default(false).optional(),
  documentUpdates: z.boolean().default(false).optional(),
});

const securityFormSchema = z.object({
  twoFactorAuth: z.boolean().default(false).optional(),
  passwordChangeInterval: z.enum(["never", "30days", "60days", "90days"], {
    required_error: "Please select a password change interval.",
  }),
  sessionTimeout: z.enum(["15min", "30min", "1hour", "4hours", "1day"], {
    required_error: "Please select a session timeout.",
  }),
});

const changeEmailFormSchema = z.object({
  newEmail: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  passwordForEmail: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "A senha atual é obrigatória.",
  }),
  newPassword: z.string().min(8, {
    message: "A nova senha deve ter pelo menos 8 caracteres.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});


type ProfileFormValues = z.infer<typeof profileFormSchema>
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>
type SecurityFormValues = z.infer<typeof securityFormSchema>
type ChangeEmailFormValues = z.infer<typeof changeEmailFormSchema>;
type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export function SettingsForm() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const { setTheme } = useTheme();
  const [currentUser, setCurrentUser] = React.useState<ProfileFormValues | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);


  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      dataNascimento: "",
      cpf: "",
      telefone: "",
      enderecoFoto: "",
      caoGuia: false,
      cep: "",
      bairro: "",
      rua: "",
      numeroEndereco: "",
      cidade_Id: 0,
    },
  });

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "default",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      newProposals: true,
      newComments: true,
      mentions: true,
      documentUpdates: false,
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      passwordChangeInterval: "never",
      sessionTimeout: "30min",
    },
  });

  const changeEmailForm = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      newEmail: "",
      passwordForEmail: "",
    },
  });

  const changePasswordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });


  React.useEffect(() => {
    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            // Get userId from decoded token
            const decodedUser = getAuthUser();
            if (!decodedUser) {
                toast.error("Sessão expirada", { description: "Por favor, faça login novamente." });
                // Redirect to login if no valid token
                window.location.href = '/login';
                return;
            }
            const userId = parseInt(decodedUser.nameid); // 'nameid' claim contains the user ID

            if (isNaN(userId)) {
                throw new Error("ID do usuário inválido no token.");
            }

            const response = await api.get(`/Pessoa/${userId}`); // Fetch by ID as before
            const fetchedUser = response.data;

            const formattedUser = {
                ...fetchedUser,
                dataNascimento: new Date(fetchedUser.dataNascimento).toISOString().split('T')[0],
            };

            setCurrentUser(formattedUser);
            profileForm.reset(formattedUser);

        } catch (error) {
            console.error("Falha ao buscar dados do usuário:", error);
            toast.error("Erro ao carregar dados do perfil", {
                description: "Não foi possível carregar seus dados. Tente novamente mais tarde.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (activeTab === 'profile') {
        fetchUserData();
    }
}, [profileForm, activeTab]);

  async function onProfileSubmit(data: ProfileFormValues) {
    try {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) throw new Error("Usuário não autenticado.");
      const localUserData = JSON.parse(userDataString);
      const userId = localUserData?.id;

      await api.put(`/Pessoa`, { ...data, id: userId });

      toast.success("Perfil atualizado", {
        description: "Suas informações de perfil foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Falha ao atualizar o perfil", {
        description: "Ocorreu um erro. Tente novamente mais tarde.",
      });
    }
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)
    toast.success("Aparência atualizada", {
      description: "Suas configurações de aparência foram atualizadas com sucesso.",
    })
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast.success("Preferências de notificação atualizadas", {
      description: "Suas preferências de notificação foram salvas com sucesso.",
    })
  }

  function onSecuritySubmit(data: SecurityFormValues) {
    toast.success("Configurações de segurança atualizadas", {
      description: "Suas configurações de segurança foram salvas com sucesso.",
    })
  }
  async function onChangeEmailSubmit(data: ChangeEmailFormValues) {
    try {
      const decodedUser = getAuthUser();
      if (!decodedUser) {
        toast.error("Erro de autenticação", {
          description: "Usuário não encontrado. Por favor, faça login novamente.",
        });
        return;
      }
      const userId = parseInt(decodedUser.nameid); // Get userId from decoded token

      await api.put(`/Pessoa/change-email`, {
        userId: userId,
        newEmail: data.newEmail,
        password: data.passwordForEmail,
      });

      setCurrentUser(prev => prev ? { ...prev, email: data.newEmail } : null);

      toast.success("E-mail alterado com sucesso!", {
        description: "Seu endereço de e-mail foi atualizado.",
      });
      changeEmailForm.reset();
    } catch (error) {
      console.error("Erro ao alterar o e-mail:", error);
      toast.error("Falha ao alterar o e-mail", {
        description: "Ocorreu um erro. Verifique sua senha e tente novamente.",
      });
    }
  }

  async function onChangePasswordSubmit(data: ChangePasswordFormValues) {
    try {
      const decodedUser = getAuthUser();
      if (!decodedUser) {
        toast.error("Erro de autenticação", {
          description: "Usuário não encontrado. Por favor, faça login novamente.",
        });
        return;
      }
      const userId = parseInt(decodedUser.nameid); // Get userId from decoded token

      await api.put(`/Pessoa/change-password`, {
        userId: userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Senha alterada com sucesso!", {
        description: "Sua senha foi atualizada com segurança.",
      });
      changePasswordForm.reset();
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      toast.error("Falha ao alterar a senha", {
        description: "Ocorreu um erro. Verifique sua senha atual e tente novamente.",
      });
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Perfil</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <SunIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Aparência</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <BellIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Notificações</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <LockIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Segurança</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Gerencie as informações do seu perfil.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="dataNascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="bairro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="cidade_Id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a cidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Blumenau</SelectItem>
                            <SelectItem value="2">Joinville</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="rua"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input placeholder="Sua rua" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="numeroEndereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input placeholder="Nº" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="caoGuia"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Possui cão guia?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Atualizar Perfil</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>Customize a aparência da aplicação.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...appearanceForm}>
              <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                <FormField
                  control={appearanceForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Tema</FormLabel>
                      <FormDescription>Selecione o tema para o painel.</FormDescription>
                      <FormMessage />
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid lg:flex max-w-md grid-cols-3 gap-8 pt-2"
                      >
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="light" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Claro</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="dark" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Escuro</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="system" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="space-y-2 rounded-md bg-slate-950 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Sistema</span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
                <FormField
                  control={appearanceForm.control}
                  name="fontSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho da Fonte</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tamanho da fonte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">Padrão</SelectItem>
                          <SelectItem value="comfortable">Confortável</SelectItem>
                          <SelectItem value="compact">Compacto</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Escolha o tamanho da fonte para a aplicação.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Atualizar aparência</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Configure como você recebe notificações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Canais de Notificação</h3>
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notificações por Email</FormLabel>
                            <FormDescription>Receba notificações por email.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notificações Push</FormLabel>
                            <FormDescription>Receba notificações push no seu dispositivo.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Tipos de Notificação</h3>
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="newProposals"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Novas Propostas</FormLabel>
                            <FormDescription>Seja notificado quando uma nova proposta for criada.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="newComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Novos Comentários</FormLabel>
                            <FormDescription>Seja notificado quando alguém comentar no seu documento.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="mentions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Menções</FormLabel>
                            <FormDescription>Seja notificado quando alguém mencionar você.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="documentUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Atualizações de Documentos</FormLabel>
                            <FormDescription>Seja notificado quando um documento que você segue for atualizado.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Salvar preferências</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>
              Gerencie suas configurações de segurança.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <CardTitle className="text-lg">Alterar E-mail</CardTitle>
              <CardDescription className="mt-1">
                Atualize seu endereço de e-mail.
              </CardDescription>
              <Form {...changeEmailForm}>
                <form onSubmit={changeEmailForm.handleSubmit(onChangeEmailSubmit)} className="space-y-8 mt-6">
                  <FormField control={changeEmailForm.control} name="newEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Novo E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            isLoading
                              ? "Carregando e-mail atual..."
                              : (currentUser?.email || "novo@exemplo.com")
                          }
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={changeEmailForm.control} name="passwordForEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sua Senha Atual</FormLabel>
                      <FormControl><Input type="password" placeholder="Digite sua senha" {...field} /></FormControl>
                      <FormDescription>Para sua segurança, digite sua senha para alterar o e-mail.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={changeEmailForm.formState.isSubmitting || isLoading}>
                    {changeEmailForm.formState.isSubmitting ? 'Atualizando...' : 'Atualizar E-mail'}
                  </Button>
                </form>
              </Form>
            </div>

            <Separator />

            <div>
              <CardTitle className="text-lg">Alterar Senha</CardTitle>
              <CardDescription className="mt-1">
                Atualize sua senha. Use uma senha forte e única.
              </CardDescription>
              <Form {...changePasswordForm}>
                <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)} className="space-y-8 mt-6">
                  <FormField control={changePasswordForm.control} name="currentPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha Atual</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={changePasswordForm.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={changePasswordForm.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Nova Senha</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={changePasswordForm.formState.isSubmitting}>
                    {changePasswordForm.formState.isSubmitting ? 'Atualizando...' : 'Atualizar Senha'}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  )
}